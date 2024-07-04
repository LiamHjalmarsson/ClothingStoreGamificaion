import React, { useCallback, useEffect, useState } from 'react';
import { useCartContext } from '../../context/cartContext';
import CartForm from './components/CartForm';
import { useActionData } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartDetails from './components/CartDetails';
import CartConfirmation from './components/CartConfirmation';
import { useRootContext } from '../Root';

export const cartAction = async ({ request }) => {
    let formData = await request.formData();
    let data = Object.fromEntries(formData);

    let user = JSON.parse(data.user);
    let cart = JSON.parse(data.cart);
    let earnedPoints = JSON.parse(data.earnPoints);
    let totalToPay = JSON.parse(data.totalToPay);
    let shippingFee = JSON.parse(data.shippingFee);
    let discount = JSON.parse(data.discount);

    if (cart.length <= 0) {
        toast.error("Cart is empty");
        return null;
    }

    let purchaseObject = {
        userId: user._id ? user._id : "66844a6aa1134d308362685a",
        items: cart.map(item => ({
            productId: item._id,
            quantity: item.quantity,
            price: item.price
        })),
        totalPrice: totalToPay,
        name: data.name,
        shippingFee: shippingFee
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

        let totalPointsEarned = user.totalPointsEarned + earnedPoints;

        if (ordersCount === 1) {
            achievementUpdate.push('6681828a064778b8918cfebd');
        }

        await fetch(`/api/user/update-user`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pointsEarned: user.pointsEarned - discount + earnedPoints,
                totalPointsEarned,
                orders: [...user.orders, purchase._id],
                achievements: achievementUpdate,
            })
        });

        return { cart, purchase, totalPointsEarned };
    }

    toast.success("Purchase completed successfully");

    return { cart, purchase };
}

const Cart = () => {
    let { clearCart } = useCartContext();
    let { user, ranks } = useRootContext();
    let confirmationPurchase = useActionData();
    let [showConfirmation, setShowConfirmation] = useState(false);

    let confirmationHandler = () => {
        clearCart();
        setShowConfirmation(false);
    }

    let updateRanks = useCallback(async (unlockRankId) => {
        try {
            await fetch(`/api/user/update-user`, {
                method: "PATCH",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ranks: [...user.ranks, unlockRankId],
                }),
            });

        } catch (error) {
            console.error("Error updating ranks:", error);
        }
    }, [user.ranks]);

    useEffect(() => {

        if (confirmationPurchase) setShowConfirmation(true)

        if (confirmationPurchase && user) {
            let unlockRank = ranks.find(rank => confirmationPurchase.totalPointsEarned >= rank.unlockAt && !user.ranks.includes(rank._id));

            if (unlockRank) updateRanks(unlockRank._id);

        }
    }, [confirmationPurchase, user.ranks]);

    return (
        <section className='w-full min-h-[90vh] flex flex-col relative'>
            <div className='flex max-lg:flex-wrap gap-24 w-full mx-auto max-w-7xl mt-24 px-4 lg:px-12'>
                <CartDetails />
                <CartForm />
            </div>

            {showConfirmation && <CartConfirmation confirmationHandler={confirmationHandler} data={confirmationPurchase} />}
        </section >
    );
}

export default Cart;
