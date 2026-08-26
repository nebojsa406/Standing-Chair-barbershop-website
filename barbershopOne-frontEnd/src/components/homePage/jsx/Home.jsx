
import { HeroHome } from './HeroHome';
import { ServicesHome } from './ServicesHome';
import { CommentHome } from './CommentHome';
import { InsideShopHome } from './InsideShopHome';

export function Home() {
    return (
        <main>
            <HeroHome />
            <ServicesHome />
            <CommentHome />
            <InsideShopHome />
        </main>
    )
}