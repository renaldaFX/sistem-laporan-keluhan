    <template>
        <div class="bg-gray-100 pb-24">
            <header id="header" class="bg-gray-700">
                <nav class="container mx-auto flex justify-start items-center py-5 px-4">
                    <!-- App Name -->
                    <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

                    <div class="flex items-center">
                        <!-- Primary Navigation -->
                        <ul class="flex flex-row mt-1">
                            <!-- Navigation Links -->
                            <li>
                                <a class="px-2 text-white" href="#">Login / Register</a>
                            </li>
                            <li>
                                <a class="px-2 text-white" href="#">Manage</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <!-- Main Content -->
            <section class="container mx-auto mt-6">
                <div class="md:grid md:grid-cols-3 md:gap-4">
                    <div class="col-span-1">
                        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                                <span class="card-title">Upload</span>
                                <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
                            </div>
                            <div class="p-6">
                                <div
                                    class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid">
                                    <h5>Drop your pictures here</h5>
                                </div>
                                <hr class="my-6" />
                                <div class="border border-gray-200 p-3 mb-4 rounded">
                                    <div>
                                        <h4 class="inline-block text-2xl font-bold">Laporkan🚨</h4>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                                        </button>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
                                            <i class="fa fa-pencil-alt"></i>
                                        </button>
                                    </div>
                                    <div>
                                        <form class="mt-4">
                                            <div class="mb-3">
                                                <label class="inline-block mb-2">Judul Laporan</label>
                                                <input type="text" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                                                    placeholder="Enter report Title" />
                                            </div>
                                            <div class="mb-3">
                                                <label class="inline-block mb-2">Alamat</label>
                                                <input type="text" class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded" placeholder="Address" />
                                            </div>
                                            <div class="mb-3">
                                                <label class="inline-block mb-2">Deskripsikan Kejadian</label>
                                                <textarea class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                                                    placeholder="Deskripsi" />
                                            </div>
                                            <button type="submit"
                                                class="w-full py-1.5 px-3 rounded text-white bg-green-600">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2">
                        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
                            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
                                <span class="card-title">My Dashboard</span>
                            </div>
                            <div class="p-6">
                                <div class="border border-gray-200 p-3 mb-4 rounded">
                                    <div>
                                        <h4 class="inline-block text-2xl font-bold">Nama Laporan</h4>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                                            <i class="fa fa-times"></i>
                                        </button>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
                                            <i class="fa fa-pencil-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="border border-gray-200 p-3 mb-4 rounded">
                                    <div>
                                        <h4 class="inline-block text-2xl font-bold">Nama Laporan</h4>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                                            <i class="fa fa-times"></i>
                                        </button>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
                                            <i class="fa fa-pencil-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="border border-gray-200 p-3 mb-4 rounded">
                                    <div>
                                        <h4 class="inline-block text-2xl font-bold">Nama Laporan</h4>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                                            <i class="fa fa-times"></i>
                                        </button>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
                                            <i class="fa fa-pencil-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="border border-gray-200 p-3 mb-4 rounded">
                                    <div>
                                        <h4 class="inline-block text-2xl font-bold">Nama Laporan</h4>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                                            <i class="fa fa-times"></i>
                                        </button>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
                                            <i class="fa fa-pencil-alt"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="border border-gray-200 p-3 mb-4 rounded">
                                    <div>
                                        <h4 class="inline-block text-2xl font-bold">Nama Laporan</h4>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                                            <i class="fa fa-times"></i>
                                        </button>
                                        <button
                                            class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right">
                                            <i class="fa fa-pencil-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </template>

<script>
import Header from '../components/Header.vue';
export default {
    components: {
        Header
    }
}
</script>