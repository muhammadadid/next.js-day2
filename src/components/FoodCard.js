import { Router } from "next/router";

export default function FoodCard({ food }) {
    const onClick = () => {
        Router.push(`/food/${food.id}`);
    }
    return (
        <div>
            <li className="p-8 bg-red-300 border rounded w-38" onClick={onClick}>
                <img className="object-contain w-32 h-auto rounded aspect-square" src={food.imageUrl} alt="food" />
                <h1 className="text-3xl">{food.name}</h1>
            </li>
        </div>
    );
}