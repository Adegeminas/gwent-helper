

<script setup lang="ts">
import { type Deck, type Card } from "@/types";
import { MetaDecks } from "@/data/decks";
import CardView from './CardView.vue';
import { ref, computed } from 'vue';
import { onMounted } from "vue";
import defaultDecks from './defaultDecks.json';

const decks = ref<Deck[]>(MetaDecks);
const currentDeck = ref<Deck>(decks.value[0]);
const showIcons = ref(true);
const showNames = ref(true);
const showCategory = ref(true);

onMounted(() => {
	if (localStorage.getItem('decks') === null) {
		localStorage.setItem('decks', JSON.stringify(defaultDecks));
	}

	const savedDecks = JSON.parse(localStorage.getItem('decks') || '[]') as Array<Deck>;
	decks.value = savedDecks;
	if (decks.value.length > 0) {
		currentDeck.value = decks.value[0];
	}
});

function onSelectDeck(value: Deck): void {
	currentDeck.value = value;
}

function onClick(card: Card): void {
	if (card.echo) {
		if (card.played) {
			card.played = false;
			card.echoed = false;
		} else if (card.echoed) {
			card.played = true;
			card.echoed = false;
		} else {
			card.echoed = true;
		}
	} else {
		card.played = !card.played;
	}
}

function onRightClick(card: Card): void {
	card.unknown = !card.unknown;
}

const provLeft = computed(() => {
	return currentDeck.value.cards.
		filter(c => !c.played).
		reduce((x, y) => x + (y.prov || 0) - 4, 0);
});
</script>

<template>
	<div class="deck-tracker">
		<v-btn class="mr-2 mb-4" @click="showIcons = !showIcons">Icons</v-btn>
		<v-btn class="mr-2 mb-4" @click="showNames = !showNames">Names</v-btn>
		<v-btn class="mr-2 mb-4" @click="showCategory = !showCategory">Categories</v-btn>

		<v-select
			:model-value="currentDeck"
			item-title="name"
			return-object
			:items="decks.sort((d1, d2) => d1.name.localeCompare(d2.name))"
			label="Select deck"
			@update:model-value="onSelectDeck"
		></v-select>

		<div class="cards-container">
			<CardView v-for="(card, index) in currentDeck.cards.sort((c1, c2) => Number(c2.prov) - Number(c1.prov))" :key="index"
				:card="card" :showIcons="showIcons" :showNames="showNames" :showCategory="showCategory"
				@left-click="onClick" @right-click="onRightClick"/>
		</div>
	</div>
</template>

<style>
.deck-tracker {
	padding: 3px;
	height: 100%;
}
.cards-container {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	gap: 2px;
}
.card {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	border: 1px dotted gray;
	cursor: pointer;
	padding: 1px 10px;
	background-color: #090629;
	font-size: small;
	line-height: 1.2;
	font-family:Verdana, Geneva, Tahoma, sans-serif;
	color: white;
	text-shadow: 2px -1px black;
	
	background-position: top 20% center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 130px;
	position: relative;

	.card-info {
		position: absolute;
		bottom: 0;
		left: auto;
		display: flex;
		flex-direction: row;
		align-items: center;

		.card-info__prov {
			margin-right: 5px;
			font-weight: bold;
		}

		.card-info__name {
			max-width: 100px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	.card-category {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		top: 0;
		right: 0;
	}
	
	&.played {
		text-decoration: line-through;
		opacity: 0.1;
	}
	&.echoed {
		background-color: lightseagreen;
		border: 3px solid purple !important;
	}
	&.unknown {
		background: darkred;
		opacity: 0.8;
		background-image: none !important;
		.card-info {
			position: relative;
			align-items: center;
			justify-content: center;
			width: 100%;
			font-size: 30px;
		}
		.card-category {
			display: none;
		}
	}

	.v-btn {
		margin-left: 3px;
	}
}
</style>