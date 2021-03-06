import {useEffect, useState} from "react";

const useShopAnimation =  (shopStateUpdate:CallableFunction, showAnimation:string, delays = [ 800, 800 ] ) => {
    const [ animationClassName, setAnimationClassName ] = useState('shop-group-hidden');
    const showFromTop = (setAnimationClassName:CallableFunction, steps:number[]) => {
        new Promise((res) => {
            setTimeout(()=>{
                setAnimationClassName('shop-group-transition-start');
                res(null)
            }, steps[0])
        })
            .then(()=>{
                setTimeout(()=>{
                    setAnimationClassName('shop-group-current');
                    shopStateUpdate((prevState:{[key:string]:any})=>({
                        ...prevState,
                        loading:false
                    }));
                }, steps[1])
            })

    }
    const hideToBottom = ( setAnimationClassName:CallableFunction, steps:number[] ) =>{
        new Promise((res) => {
            setTimeout(()=>{
                setAnimationClassName('shop-group-transition-end');
                res(null)
            }, steps[0])
        })
            .then(()=>{
                setTimeout(()=>{
                    setAnimationClassName('shop-group-hidden');
                }, steps[1])
            })
    }
    useEffect(()=>{
        switch ( showAnimation ){
            case 'showFromTop' :
                showFromTop(setAnimationClassName,delays)
                break;
            case  'hideToBottom' :
                hideToBottom(setAnimationClassName,delays)
                break;
        }
    },[showAnimation]);

    return animationClassName;
}

export default useShopAnimation;
