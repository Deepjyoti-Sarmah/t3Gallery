import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { deleteImage, getImage } from "~/server/queries";

export default async function FullPageImageView(props: {id: number}) {
    const idAsNumber = Number(props.id);
    if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

    const image = await getImage(props.id);
    const uploaderInfo = await clerkClient.users.getUser(image.userId);

    return (
        <div className="flex h-full">
            <div className="w-2/3 flex items-center justify-center ">
                <img src={image.url} className="max-h-full max-w-full object-contain" alt={image.name} />
            </div>
            <div className="w-1/3 flex flex-col text-gray-200">
                <div className="text-lg border-b text-center p-2">
                    <span className="text-wrap">{image.name}</span>
                </div>
                <div className="flex flex-wrap p-2">
                    <span className="p-1">Uploaded By: </span>
                    <span className="p-1">{uploaderInfo.fullName}</span>
                </div>
                <div className="flex flex-wrap p-2">
                    <span className="p-1">Created On: </span>
                    <span className="p-1">{new Date(image.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 mt-auto">
                    <form
                        action={async () => {
                            "use server";
                            await deleteImage(idAsNumber);
                        }}
                    >
                        <Button type="submit" variant="destructive">
                            Delete
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
