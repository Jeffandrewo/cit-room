'use client'
import { useEffect, useState } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUser } from '@clerk/clerk-react'; // Import Clerk user hook
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';

export default function Calendar() {
  const { user } = useUser(); // Get Clerk user

  const [allEvents, setAllEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    start: '',
    allDay: false,
    id: 0,
  });

  useEffect(() => {
    const q = collection(db, 'calend');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = [];
      snapshot.forEach((doc) => {
        eventsData.push({ ...doc.data(), id: doc.id });
      });
      setAllEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title');
          let id = eventEl.getAttribute('data');
          let start = eventEl.getAttribute('start');
          return { title, id, start };
        },
      });
    }
  }, []);

  function handleDateClick(arg) {
    if (user) {
      setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() });
      setShowModal(true);
    } else {
      console.log('User is not logged in');
    }
  }

  async function addEvent(data) {
    if (!user) {
      console.log('User is not logged in');
      return;
    }

    const event = {
      ...newEvent,
      start: data.start.toISOString(),
      title: data.title,
      description: data.description,
      allDay: data.allDay,
      id: new Date().getTime(),
    };

    try {
      const docRef = await addDoc(collection(db, 'calend'), event);
      setAllEvents([...allEvents, { ...event, id: docRef.id }]);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  }

  function handleDeleteModal(data) {
    if (user) {
      setShowDeleteModal(true);
      setIdToDelete(data.event.id);
    } else {
      console.log('User is not logged in');
    }
  }

  async function handleDelete() {
    if (!user) {
      console.log('User is not logged in');
      return;
    }

    try {
      await deleteDoc(doc(db, 'calend', idToDelete));
      setAllEvents(allEvents.filter((event) => event.id !== idToDelete));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      title: '',
      description: '',
      start: '',
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!newEvent.start || !(newEvent.start instanceof Date)) {
      console.error('Invalid start date:', newEvent.start);
      return;
    }

    addEvent(newEvent);
    setShowModal(false);
    setNewEvent({
      title: '',
      description: '',
      start: '',
      allDay: false,
      id: 0,
    });
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
              }}
              events={allEvents}
              nowIndicator={true}
              editable={user ? true : false} // Set editable based on user login status
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>
          <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-green-200">
            <h1 className="font-bold text-lg text-center">List of Events</h1>
            {allEvents.map(event => (
              <div
                className="border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                title={event.title}
                key={event.id}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>

        <Transition.Root show={showDeleteModal}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
            onClose={setShowDeleteModal}
          >
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full max-w-lg">
                <div className="text-center sm:mt-0">
                  <ExclamationTriangleIcon className="h-6 w-6 mx-auto text-red-600" aria-hidden="true" />
                  <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mt-2">
                    Delete Event
                  </Dialog.Title>
                  <p className="text-sm text-gray-500 mt-2">Are you sure you want to delete this event?</p>
                </div>
                <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={showModal}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center"
            onClose={setShowModal}
          >
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full max-w-lg">
                <div className="text-center sm:mt-0">
                  <CheckIcon className="h-6 w-6 mx-auto text-green-600" aria-hidden="true" />
                  <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 mt-2">
                    Add Event
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="title"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={newEvent.title}
                        onChange={handleChange}
                        placeholder="Title"
                      />
                    </div>
                    <div className="mt-2">
                      <textarea
                        name="description"
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={newEvent.description}
                        onChange={handleChange}
                        placeholder="Description"
                      />
                    </div>
                    <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-violet-600 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:ml-3 sm:w-auto sm:text-sm"
                        disabled={newEvent.title === ''}
                      >
                        Create
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </main>
    </>
  );
}
