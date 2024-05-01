import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: {id: number}) {

    const image = await getImage(props.id)
    return (
        <div className="flex w-full h-full min-w-0 bg-green-200">
            <div className="flex-shrink">
                <img src={image.url} className="object-contain flex-shrink"/>
            </div>

            <div className="w-48 flex flex-col flex-shrink-0">
                <div className="text-xl font-bold">{image.name}</div>
            </div>
        </div>
    );
}
