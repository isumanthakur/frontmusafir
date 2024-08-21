import Categories from "../components/Categories";
import PropertyLists from "../components/properties/ Propertylist2";
import PropertyListss from "../components/properties/Propertylist3";
import { getUserId } from "../lib/actions";
import BackButton from "../components/BackButton"; // Import the BackButton component

const MyFavoritesPage = async () => {
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
                    <h1 className="mb-3 mt-10 font-sans font-semibold text-4xl">My favorites</h1>
                    <div className="flex flex-row">
                        <button className="border border-emerald-500 text-xs px-1 rounded-md font-sans font-semibold text-emerald-500">Favourites</button>
                        <p className="text-xs font-sans px-5">Musafir wishlist</p>
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
                <h3 className="py-5 font-sans font-semibold text-xl">Your Recent Favorites</h3>
            </div>
            
            <div className="">
                <PropertyLists 
                    favorites={true}
                />
            </div>
            <div>
                <h3 className="mt-16 py-5 font-sans font-semibold text-xl">Our Recommendations</h3>
            </div>
            
            <div className="">
                <PropertyListss 
                />
            </div>
        </main>
    )
}

export default MyFavoritesPage;
