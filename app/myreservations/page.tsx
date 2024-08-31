import Image from "next/image";
import apiService from "../services/apiService";
import Link from "next/link";
import BackButton from "../components/BackButton";

const MyReservationsPage = async () => {
    const reservations = await apiService.get('/api/auth/myreservations/')

    return (
        <main className="p-7 md:p-24 pt-5">
            <BackButton />

            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="mb-3 mt-10 font-sans font-semibold text-4xl">My reservations</h1>
                    <div className="flex flex-row">
                        <button className="border border-emerald-500 text-xs px-1 rounded-md font-sans font-semibold text-emerald-500">services</button>
                        <p className="text-xs font-sans px-5"></p>
                    </div>
                </div>
                <div className="flex items-center justify-center h-full">
                    <button className="border font-sans flex content-center font-semibold align-middle self-center text-xs p-2 rounded-3xl px-6">
                        Musafir approved
                    </button>
                </div>
            </div>
            <hr className="my-10" />

            <div className="space-y-4">
                {reservations.map((reservation: any) => {
                    return (
                        <div key={reservation.id} className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-tr from-gray-200 via-gray-200/70 to-transparent shadow-lg rounded-3xl">
                            <div className="col-span-1">
                                <div className="relative overflow-hidden h-40 aspect-square rounded-xl">
                                    <Image
                                        fill
                                        src={reservation.property.image_url}
                                        className="hover:scale-110 object-cover transition h-40 w-40"
                                        alt="Beach house"
                                    />
                                </div>
                            </div>

                            <div className="col-span-3 flex items-center justify-between">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <h2 className="text-xl">{reservation.property.title}</h2>
                                    <p><strong>Check in date:</strong> {reservation.start_date}</p>
                                    <p><strong>Check out date:</strong> {reservation.end_date}</p>
                                    <p><strong>Nights:</strong> {reservation.number_of_nights}</p>
                                    <p><strong>Total price:</strong> ${reservation.total_price}</p>
                                </div>
                                <div>
                                    <Link
                                        href={`/properties/${reservation.property.id}`}
                                        className="py-2 px-4 bg-teal-400 text-white rounded-md hover:bg-teal-400 transition"
                                    >
                                        Go 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default MyReservationsPage;
