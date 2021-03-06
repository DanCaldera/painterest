import { Dialog, Transition } from '@headlessui/react'
import { HomeIcon, MenuIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import Loading from '../components/Loading'
import Meta from '../components/Meta'
import Modal from '../components/Modal'
import { auth } from '../firebase'
import useValidateUser from '../hooks/useValidateUser'
import { axiosInstance } from '../lib/axiosConfig/axiosSetup'
import { Image } from '../types/images'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ReactViewer = dynamic(() => import('react-viewer'), { ssr: false })

export default function App() {
  const [openSlider, setOpenSlider] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [images, setImages] = useState<Image | any>([])
  const [search, setSearch] = useState<string>('travel')
  const [mobileSearch, setMobileSearch] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const { authenticatedUser, isValidatingUser } = useValidateUser()
  const router = useRouter()

  // Quick way to protect app route
  useEffect(() => {
    if (!isValidatingUser) {
      if (!authenticatedUser) {
        router.replace('/')
      }
    }
  }, [isValidatingUser])

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axiosInstance.get(`3/gallery/t/${search}/0`)

      if (response.status === 200) {
        setImages(response.data.data.items)
      } else {
        toast.error('Something went wrong')
      }
    }

    if (search.length > 2) {
      fetchImages()
    }
  }, [search])

  const _logOut = async () => {
    await auth.signOut()
    router.replace('/')
  }

  const _fetchMoreData = async () => {
    const response = await axiosInstance.get(`3/gallery/t/${search}/${page}`)
    if (response.status === 200) {
      setPage(page + 1)
      setImages(images.concat(response.data.data.items))
    } else {
      toast.error('Something went wrong')
    }
  }

  const _searchFromMobileSlider = () => {
    setSearch(mobileSearch)
    setOpenSlider(false)
  }

  return (
    <div className="lg:p-10 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50">
      <Meta title="Painterest" />
      <Toaster />
      <div className="h-full flex flex-col bg-white p-2 rounded-xl border shadow-lg">
        {/* Top nav*/}
        <header className="flex-shrink-0 relative h-16 bg-white flex items-center my-2">
          {/* Logo area */}
          <div className="absolute inset-y-0 left-0 lg:static lg:flex-shrink-0">
            <a
              href="/"
              className="flex items-center justify-center h-16 w-16 bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600 m-7"
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
              onClick={() => setOpenSlider(true)}
            >
              <span className="sr-only">Open main menu</span>
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop nav area */}
          <div className="hidden lg:flex-1 lg:flex">
            <div className="w-full mx-8 border border-gray-400 rounded-xl relative text-gray-400 focus-within:text-gray-500">
              <label className="sr-only">Search</label>
              <input
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
          <Transition.Root show={openSlider} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpenSlider}>
              <div className="absolute inset-0 overflow-hidden">
                <Dialog.Overlay className="absolute inset-0" />

                <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <div className="w-screen max-w-md">
                      <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                        <div className="h-16 flex items-center justify-between px-4 sm:px-6 mb-4">
                          <a
                            href="/"
                            className="flex items-center justify-center h-16 w-16 bg-pink-400 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
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
                          <button
                            type="button"
                            className="-mr-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-600"
                            onClick={() => setOpenSlider(false)}
                          >
                            <span className="sr-only">Close main menu</span>
                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="mt-2 w-full px-4 sm:px-6 flex items-center">
                          <div className="relative w-full text-gray-400 focus-within:text-gray-500">
                            <label className="sr-only">Search</label>
                            <input
                              onChange={(e) => setMobileSearch(e.target.value.toLowerCase())}
                              type="search"
                              placeholder="Search"
                              className="block w-full border-gray-300 rounded-md pl-10 placeholder-gray-500 focus:border-pink-600 focus:ring-pink-600"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                              <SearchIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                          </div>
                          <button
                            onClick={() => _searchFromMobileSlider()}
                            className="bg-pink-500 text-white ml-2 p-2 rounded-md"
                          >
                            Go
                          </button>
                        </div>

                        <div className="pt-4 pb-3">
                          <div className="max-w-8xl mx-auto px-4 flex items-center sm:px-6">
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="text-base font-medium text-gray-800 truncate">
                                {authenticatedUser?.displayName}
                              </div>
                              <div className="text-sm font-medium text-gray-500 truncate">
                                {authenticatedUser?.email}
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 max-w-8xl mx-auto px-2 space-y-1 sm:px-4">
                            <button
                              onClick={() => _logOut()}
                              className="block rounded-xl py-2 px-3 text-base font-medium text-pink-500 hover:bg-gray-50"
                            >
                              Sign out
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </header>

        {/* Bottom section */}
        <div className="min-h-0 flex-1 flex overflow-hidden">
          {/* Narrow sidebar*/}
          <nav aria-label="Sidebar" className="hidden lg:block lg:flex-shrink-0 lg:bg-white lg:overflow-y-auto mr-8">
            <div className="relative w-30 flex flex-col pl-8 space-y-3 pt-2">
              <a
                key={'Home'}
                href={'/'}
                className={classNames(
                  false ? 'bg-gray-100 text-gray-700' : 'text-gray-700 hover:bg-gray-100',
                  'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-full border border-gray-300'
                )}
              >
                <span className="sr-only">{'Home'}</span>
                <HomeIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>
            <div className="relative w-30 flex flex-col pl-8 pt-2">
              <div className="dropdown inline-block">
                <button
                  onClick={() => setOpenModal(true)}
                  className={classNames(
                    false ? 'bg-gray-100 text-gray-700' : 'text-gray-700 hover:bg-gray-100',
                    'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-full border border-gray-300'
                  )}
                >
                  <span className="sr-only">{'Profile Modal'}</span>
                  <UserIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </nav>

          <InfiniteScroll dataLength={images.length} next={_fetchMoreData} hasMore={true} loader={<Loading />}>
            <section id="photos" className="mx-8 my-12">
              {images &&
                images.map(
                  (item) =>
                    item.images &&
                    item.images[0].link.includes('jpg') && (
                      <img
                        loading="lazy"
                        onClick={() => {
                          setVisible(true)
                          setSelectedImage(item.images[0].link)
                        }}
                        className="p-2 rounded-xl cursor-pointer img"
                        src={item.images ? item.images[0].link : ''}
                        alt="Image"
                      />
                    )
                )}
            </section>
          </InfiniteScroll>

          <ReactViewer visible={visible} onClose={() => setVisible(false)} images={[{ src: selectedImage }]} />

          <Modal open={openModal} setOpen={setOpenModal}>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  onClick={() => setOpenModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>
                <div className="px-4 py-3">
                  <p className="text-sm">Signed in as</p>
                  <p className="text-base font-medium text-gray-900 truncate mt-2">{authenticatedUser?.displayName}</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{authenticatedUser?.email}</p>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-pink-600 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:text-sm"
                  onClick={() => _logOut()}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}
