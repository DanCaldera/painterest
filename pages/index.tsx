import { Dialog, Transition } from '@headlessui/react'
import { HomeIcon, MenuIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import Meta from '../components/Meta'
import { axiosInstance } from '../lib/axiosConfig/axiosSetup'

const user = {
  name: 'Any Venegas',
  email: 'any@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const sidebarNavigation = [
  { name: 'Open', href: '#', icon: HomeIcon, current: true },
  { name: 'User', href: '#', icon: UserIcon, current: false },
]
const userNavigation = [{ name: 'Sign out', href: '#' }]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<any>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const response = await axiosInstance.get('3/gallery/t/travel/0')

      if (response.status === 200) {
        setImages(response.data.data)
      } else {
        toast.error('Something went wrong')
      }
    }
    fetchInitialPosts()
  }, [])

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axiosInstance.get(`3/gallery/t/${search}/0`)

      if (response.status === 200) {
        setImages(response.data.data)
      } else {
        toast.error('Something went wrong')
      }
    }

    if (search.length > 2) {
      fetchImages()
    }
  }, [search])

  return (
    <div className="lg:p-10 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50">
      <Meta title="painterest" />
      <Toaster />
      <div className="h-full flex flex-col bg-white p-2 rounded-xl border shadow-lg">
        {/* Top nav*/}
        <header className="flex-shrink-0 relative h-16 bg-white flex items-center my-2">
          {/* Logo area */}
          <div className="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
            <a
              href="/"
              className="flex items-center justify-center h-16 w-16 bg-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600 m-7"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-auto text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>

          {/* Menu button area */}
          <div className="absolute right-0 pr-10 mt-16 flex items-center sm:pr-6 lg:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop nav area */}
          <div className="hidden lg:flex-1 lg:flex">
            <div className="w-full mx-8 border border-gray-400 rounded-xl relative text-gray-400 focus-within:text-gray-500">
              <label htmlFor="desktop-search" className="sr-only">
                Search
              </label>
              <input
                id="desktop-search"
                type="search"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                placeholder="Search"
                className="block w-full rounded-xl pl-12 placeholder-gray-500 border-transparent focus:border-transparent sm:text-lg focus:ring-0"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-40 lg:hidden" onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
                enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
                enterTo="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
                leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
                leaveTo="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
              >
                <nav
                  className="fixed z-40 inset-0 h-full w-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg"
                  aria-label="Global"
                >
                  <div className="h-16 flex items-center justify-between px-4 sm:px-6">
                    <a href="#">
                      <img
                        className="block h-8 w-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=pink&shade=400"
                        alt="Workflow"
                      />
                    </a>
                    <button
                      type="button"
                      className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close main menu</span>
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-2 max-w-8xl mx-auto px-4 sm:px-6">
                    <div className="relative text-gray-400 focus-within:text-gray-500">
                      <label htmlFor="mobile-search" className="sr-only">
                        Search
                      </label>
                      <input
                        id="mobile-search"
                        type="search"
                        placeholder="Search"
                        className="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-pink-600 focus:ring-pink-600"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4 pb-3">
                    <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="ml-3 min-w-0 flex-1">
                        <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                        <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
                      {userNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block rounded-xl py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </Transition.Child>
            </Dialog>
          </Transition.Root>
        </header>

        {/* Bottom section */}
        <div className="min-h-0 flex-1 flex overflow-hidden">
          {/* Narrow sidebar*/}
          <nav aria-label="Sidebar" className="hidden lg:block lg:flex-shrink-0 lg:bg-white lg:overflow-y-auto">
            <div className="relative w-30 flex flex-col p-8 space-y-3">
              {sidebarNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-100 text-gray-700' : 'text-gray-700 hover:bg-gray-100',
                    'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-full border border-gray-300'
                  )}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </nav>

          <section id="photos" className="mx-8 my-12">
            {images &&
              images.items &&
              images.items.map(
                (item) =>
                  item.images &&
                  item.images[0].link.includes('jpg') && (
                    <img className="p-2 rounded-xl" src={item.images ? item.images[0].link : ''} alt="Image" />
                  )
              )}
          </section>
        </div>
      </div>
    </div>
  )
}
