import Image from "next/image";
import ContactButton from "@/app/components/ContactButton";
import PropertyLists from "@/app/components/properties/ Propertylist2";
import { getUserId } from "@/app/lib/actions";

const LandlordDetailPage = async ({ params }: { params: { id: string }}) => {
    // Replace this with your actual API call when ready
    const landlord = {
        avatar_url: "/me.jpg", // Use the placeholder image you have
        name: "Suman Thakur",
        email: "sumam.thakur.work01@gmail.com",
        phone_number: "8240609670",
        location: "Kolkata, West Bengal",
    };
    const userId = await getUserId();

    return (
        <main className="p-4 sm:p-10 md:p-20 font-sans pt-6">
            <div className="flex flex-col md:flex-row gap-8 md:gap-36">
                <aside className="mb-4 font-semibold h-auto md:h-5/6 border px-6 py-8 md:px-10 md:py-[100px] shadow-md rounded-3xl">
                    <Image
                        src={landlord.avatar_url}
                        width={150}
                        height={150}
                        alt={landlord.name}
                        className="rounded-full mx-auto md:mx-0"
                    />

                    <h1 className="mt-4 md:mt-6 py-2 md:py-3 font-semibold text-xl md:text-2xl text-center md:text-left">{landlord.name}</h1>
                    <p className="text-gray-600 font-semibold py-2 md:py-3 text-center md:text-left">{landlord.email}</p>
                    <p className="text-gray-600 font-semibold py-2 md:py-3 text-center md:text-left">{landlord.phone_number}</p>
                    <p className="text-gray-600 font-semibold py-2 md:py-3 text-center md:text-left">{landlord.location}</p>

                    {userId != params.id && (
                        <div className="flex justify-center md:justify-start mt-4">
                            <ContactButton 
                                userId={userId}
                                landlordId={params.id}
                            />
                        </div>
                    )}
                </aside>

                <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                        <div className="text-center md:text-left">
                            <h1 className="mb-3 mt-4 md:mt-10 font-sans font-semibold text-2xl md:text-4xl">Properties Listed By Owner</h1>
                            <div className="flex flex-col md:flex-row md:items-center">
                                <button className="border border-emerald-500 text-xs px-3 py-1 rounded-md font-sans font-semibold text-emerald-500 mt-2 md:mt-0">Properties</button>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center justify-center h-full">
                            <button className="border text-emerald-500 border-emerald-500 font-sans flex content-center font-semibold text-xs p-2 rounded-3xl px-6">
                                Musafir Approved
                            </button>
                        </div>
                    </div>
                    <hr className="my-6 md:my-10" />
                    <PropertyLists
                        landlord_id={params.id}
                    />
                </div>
            </div>
        </main>
    );
}

export default LandlordDetailPage;
