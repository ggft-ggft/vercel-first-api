import {useRouter} from 'next/router'

 const Post = () => {
    const router = useRouter();
    const id = router.query;

    return (
        <div>
            <p className="pippo">
                aasd {JSON.stringify(id.id)}
            </p>
            <style jsx>
                {`.pippo {
                    border: 1px solid red;
                }`}
            </style>
        </div>
    )
 }

 export default Post;