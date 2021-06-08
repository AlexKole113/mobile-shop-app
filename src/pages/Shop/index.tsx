import CategoryList from "@/components/CategoryList";
import Search from "@/components/Search";
import GroupedCards from "@/components/GroupedCards";
import cssShopAnimation from './styles/index.scss';
import { fakeCategories as categories, getProductsByCategoryID } from "../../../mocks/fakeData/shop";
import {useEffect, useState} from "react";
import {IShopState} from "@/pages/Shop/interface";
import {IFakeProductItem} from "../../../mocks/fakeData/shop";
import ErrorAlert from "@/components/ErrorAlert";
import Preloader from "@/components/Preloader";
//import {classNameAnimationSwitcher} from "@/utils/classNameAnimationSwitcher";


const Shop = () => {
    /*

        *  Запуск
           1. Получение товаров из первой категории

        * Переход в другую категорию
           1. Получаем товары из новой категории
           2. Добавляем новые товары в hidden группу
           3. Через Timeout меняем классы
     */

    const[ actualCategories, updateActualCategories] = useState( categories );
    const[ actualProducts, updateActualProducts ] = useState<IFakeProductItem[]>([])
    const[ state, setState ] = useState<IShopState>( { loading: false, error: false, init: true, actualID: 1 } );
    useEffect(() => {

        setState((prevState)=>({...prevState, loading: true}));

        //classNameAnimationSwitcher(name, active, updatePageState,1000 );
        getProductsByCategoryID( state.actualID )
        .then( ( responseFromServer ) => {
            if( typeof responseFromServer === 'object' && responseFromServer?.hasOwnProperty('items' ) && responseFromServer.items?.length ){
               const { items } = responseFromServer;
               setState((prevState)=>({...prevState, loading: false, error: false, init:false }))
               updateActualProducts(items  )
            }
        })
        .catch(()=>{
            setState((prevState)=>({...prevState, loading: false, error: true, init:false }))
        })
    },[ state.actualID ] );

    //const getActiveID = ( categories ) => categories.filter(({ active }) => active && active === 'active' )[0].id

    const setActive = ( id:number ) => {
        if( state.loading ) return;
        const currentActualID = actualCategories.filter(({active}) => active === 'active' )[0].id;
        if( id === currentActualID ) return;

        setState({
            ...state,
            init: false,
            loading: true,
            actualID: id
        } )


        const updState = actualCategories.map( ( item) => {
            item.active = undefined;
            if(item.id === id) item.active = 'active'
            return item;
        })

        updateActualCategories( updState )
    }


    return (
        <div className={cssShopAnimation['shop-group']}>

            <CategoryList categories={categories} updateActiveItem={setActive} pageState={state} />

            <section className={cssShopAnimation['shop-group-transition']}>

                <section className={`${cssShopAnimation['shop-group-transition-group']}  ${cssShopAnimation['shop-group-hidden']}`}>
                    <Search styling={'shadow-theme'} />
                    { ( state.init ) && <Preloader /> }
                    { ( state.error ) ? <ErrorAlert text={'Something went wrong...'} /> : <GroupedCards products={actualProducts} /> }
                </section>


                <section className={`${cssShopAnimation['shop-group-transition-group']} ${cssShopAnimation['shop-group-current']}`}>
                    <Search styling={'shadow-theme'} />
                    { ( state.init ) && <Preloader /> }
                    { ( state.error ) ? <ErrorAlert text={'Something went wrong...'} /> : <GroupedCards products={actualProducts} /> }
                </section>

            </section>
        </div>
    );

}

export default Shop;
