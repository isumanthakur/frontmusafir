import Categories from "../components/Categories";
import PropertyList from "../components/properties/PropertyList";
import PropertyListsss from "../components/properties/Propertylist4";
import { getUserId } from "../lib/actions";
import BackButton from "../components/BackButton"; // Import the BackButton component

const MyPropertiesPage = async () => {
    const userId = await getUserId();

    if (!userId) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }

    return (
        <main className="max-w-[1500px] mx-auto p-7 md:p-24 md:pt-5">
            {/* Use the BackButton component here */}
            <BackButton />

            <div className="flex flex-row justify-between">
                <div>
                    <h1 className="mb-3 mt-10 font-sans font-semibold text-4xl">My Services</h1>
                    <div className="flex flex-row">
                        <button className="border border-emerald-500 text-xs px-1 rounded-md font-sans font-semibold text-emerald-500">boats</button>
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
            <div>
            </div>
            
            <div className="">
                <PropertyListsss
                    landlord_id={userId}
                />
            </div>
        </main>
    )
}

export default MyPropertiesPage;
