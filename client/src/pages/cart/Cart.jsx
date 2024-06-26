import React, { useEffect } from 'react';
import { useCartContext } from '../../context/cartContext';
import CartForm from './components/CartForm';
import { useActionData } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartDetails from './components/CartDetails';
import CartConfirmation from './components/CartConfirmation';

export const cartAction = async ({ request }) => {
    let formData = await request.formData();

    let data = Object.fromEntries(formData);

    let user = JSON.parse(data.user);
    let cart = JSON.parse(data.cart);
    let earnedPoints = JSON.parse(data.earnPoints);
    let discount = JSON.parse(data.discount);

    if (cart.length <= 0) {
        toast.error("Cart is empty");
    }

    let purchaseObject = {
        userId: user._id ? user._id : false,
        items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        })),
        name: data.name
    };

    let purchaseResponse = await fetch(`/api/purchase`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(purchaseObject)
    });

    let { purchase } = await purchaseResponse.json();

    if (user) {
        let achievementUpdate = [...user.achievements];
        let ordersCount = user.orders.length + 1;
    
        if (ordersCount === 1) {
            achievementUpdate.push('6681828a064778b8918cfebd');
        }
    
        await fetch(`/api/user/update-user`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pointsEarned: user.pointsEarned - discount + earnedPoints,
                totalPointsEarned: user.totalPointsEarned + earnedPoints,
                orders: [...user.orders, purchase._id],
                achievements: achievementUpdate
            })
        });
    }


    return { cart, purchase };
}

const Cart = () => {
    let { clearCart } = useCartContext();
    let confirmationPurchase = useActionData();

    let confirmationHandler = () => {
        clearCart();
    }

    return (
        <section className='w-full min-h-[90vh] flex flex-col relative'>
            <div className='flex gap-24 w-full mx-auto max-w-7xl mt-24 px-10'>
                <CartDetails />
                <CartForm />
            </div>

            {/* {confirmationPurchase && <CartConfirmation confirmationHandler={confirmationHandler} data={confirmationPurchase} />} */}
        </section >
    );
}

export default Cart;
