export {default} from "next-auth/middleware";



export const config = {
    matcher: ['/listing/create', '/profile', '/lisiting/favourites', '/messages']
}