import { takeLatestRequest } from '@/utils/redux/sagas';
import {
    cartInfoAction,
    cartAddAction,
    cartDeleteAction,
    cartDeleteAllAction
} from '@/actions/cart';
import Cart from "@/cart/Cart";

export function* cartSaga() {
    yield takeLatestRequest(cartInfoAction, Cart.getAllCart);
    yield takeLatestRequest(cartAddAction, Cart.addToCart);
    yield takeLatestRequest(cartDeleteAction, Cart.removeFromCart);
    yield takeLatestRequest(cartDeleteAllAction, Cart.removeIDFromCart );
}
