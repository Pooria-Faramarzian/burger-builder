import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICE = {
	salad: 1,
	cheese: 0.7,
	bacon: 0.9,
	meat: 1.5
};
class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			meat: 0,
			cheese: 0,
			bacon: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false
	};

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		this.setState({ purchasable: sum > 0 });
	}

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;

		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;

		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + INGREDIENT_PRICE[type];

		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;

		const updatedCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updatedCount;

		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - INGREDIENT_PRICE[type];

		this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Pooria Faramarzian',
				address: {
					street: 'Test32',
					zipCode: '79898',
					country: 'Iran'
				},
				email: 'pooriafaramarzian@gmail.com'
			},
			deliveryMethod: 'fastest'
		};
		axios
			.post('orders.json', order)
			.then(response => this.setState({ loading: false, purchasing: false }))
			.catch(error => this.setState({ loading: false, purchasing: false}));
	};

	render() {
		const ingredientsInfo = { ...this.state.ingredients };

		for (let key in ingredientsInfo) {
			ingredientsInfo[key] = ingredientsInfo[key] <= 0;
		}
		let orderSummary = (
			<OrderSummary
				ingredients={this.state.ingredients}
				purchaseCanceled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				price={this.state.totalPrice}
			/>
		);
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}>
						{orderSummary}
					</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredients={this.state.ingredients}
					addedIngredient={this.addIngredientHandler}
					removedIngredient={this.removeIngredientHandler}
					disabledInfo={ingredientsInfo}
					price={this.state.totalPrice}
					purchasable={!this.state.purchasable}
					ordered={this.purchaseHandler}
				/>
			</Aux>
		);
	}
}
export default BurgerBuilder;
