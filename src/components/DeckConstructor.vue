<script setup lang="ts">
import { type Deck, type Card } from "@/types";
import { allCards as library } from "@/data/cards";
import CardView from './CardView.vue';
import { ref, computed } from 'vue';
import { onMounted } from "vue";

const currentDeck = ref<Deck>({
	name: 'New deck',
	cards: [],
});
const allCards = library.sort((a, b) => (b.prov || 0) - (a.prov || 0));
const decks = ref<Deck[]>([]);
const editMode = ref(false);
const filter = ref('');
const provisionFilter = ref('');
const fractionFilter = ref('');

onMounted(() => {
	const savedDecks = JSON.parse(localStorage.getItem('decks') || '[]') as Array<Deck>;
	decks.value = savedDecks;
	if (decks.value.length > 0) {
		currentDeck.value = decks.value[0];
		editMode.value = true;
	}
});	

function createNewDeck(): void {
	currentDeck.value = {
		name: 'New deck',
		cards: [],
	};
	editMode.value = false;
}

function save(): void {
	if (confirm('Save current deck?')) {
		if (editMode.value) {
			localStorage.setItem('decks', JSON.stringify(decks.value));
		} else {
			decks.value.push(currentDeck.value);
			localStorage.setItem('decks', JSON.stringify(decks.value));
		}
	}
}

function deleteCurrentDeck(): void {
	if (confirm('Delete current deck?')) {
		decks.value = decks.value.filter(d => d !== currentDeck.value);
		localStorage.setItem('decks', JSON.stringify(decks.value));
	}
}

function selectFromAll(card: Card): void {
	// if (!currentDeck.value.cards.includes(card)) {
		currentDeck.value.cards.push(card);
	// } else {
		// currentDeck.value.cards = currentDeck.value.cards.filter(c => c !== card);
	// }
}

function removeFromDeck(card: Card): void {
	currentDeck.value.cards = currentDeck.value.cards.filter(c => c !== card);
}

function onSelectDeck(value: Deck): void {
	currentDeck.value = value;
}

function onRightClick(card: Card): void {
}

const provLeft = computed(() => {
	return 65 - currentDeck.value.cards
		.filter(c => !c.played)
		.reduce((x, y) => x + (y.prov || 0) - 4, 0);
});

const filteredCards = computed(() => {
	return allCards
		.filter(c => c.name.toLowerCase().includes(filter.value.toLowerCase()))
		.filter(c => !provisionFilter.value || c.prov === parseInt(provisionFilter.value))
		.filter(c => !fractionFilter.value || c.fraction?.includes(fractionFilter.value));
});
</script>

<template>
	<div class="deck-constructor">
		<div>
			<div class="d-flex row">
				<v-text-field label="Name" v-model="filter" hide-details flat class="mr-2"></v-text-field>
				<v-text-field label="Fraction (ng/mo...)" v-model="fractionFilter" hide-details flat class="mr-2"></v-text-field>
				<v-text-field label="Provision" v-model="provisionFilter" hide-details flat></v-text-field>
			</div>
			<div class="cards-container">
				<CardView v-for="(card, index) in filteredCards" :key="index" :card="card" :show-names="true" :show-icons="true" @left-click="selectFromAll" @right-click="onRightClick"/>
			</div>
		</div>

		<div>
			Provision left {{ provLeft }} / Total cards {{ currentDeck.cards.length }}
			<span>
				<v-btn @click="createNewDeck" class="mr-2 mb-2">New deck</v-btn>
				<v-btn @click="save" class="mr-2 mb-2">Save deck</v-btn>
				<v-btn @click="deleteCurrentDeck" class="mr-2 mb-2">Delete deck</v-btn>
				<v-select
					:model-value="currentDeck"
					item-title="name"
					return-object
					:items="decks"
					label="Выбрать колоду"
					@update:model-value="onSelectDeck"
				></v-select>
				<v-text-field label="Имя колоды" v-model="currentDeck.name"></v-text-field>
			</span>
			<span></span>
			<div class="cards-container">
				<CardView v-for="(card, index) in currentDeck.cards.sort((c1, c2) => Number(c2.prov) - Number(c1.prov))"
					:key="index" :card="card" :show-names="true" :show-icons="true" @left-click="removeFromDeck" @right-click="onRightClick"/>
			</div>
		</div>
	</div>
</template>

<style>
.deck-constructor {
	display: flex;
	flex-direction: row;
	width: 100%;
	gap: 20px;
	& > div {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 90vh;
	}
}
.cards-container {
	width: 100%;
	height: fit-content;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	gap: 2px;
	
	overflow-y: scroll;
}

</style>