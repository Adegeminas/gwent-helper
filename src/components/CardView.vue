<script setup lang="ts">

import { type Card } from "@/types";
import { type PropType, ref, reactive, computed } from 'vue';

const props = defineProps({
	card: {
		type: Object as PropType<Card>,
		required: true,
	},
	showIcons: Boolean,
	showNames: Boolean,
	showCategory: Boolean,
});
const emit = defineEmits(['left-click', 'right-click']);

function onClick() {
	emit('left-click', props.card);
}

function onRightClick(event: MouseEvent) {
	event.preventDefault();
	emit('right-click', props.card);
}

function getBgStyle(card: Card): Record<string, string> {
	return {
		backgroundImage: props.showIcons ? `url(/cards/${card.name.replace(/ /g, '%20')}.jpg)` : 'unset',
		border: '3px solid #090629',
	}
}

function getStyleByCategory(card: Card): Record<string, string> {
	if (!props.showCategory) {
		return {};
	}
	switch (card.category) {
		case 'wincon':
			return {
				backgroundColor: 'darkorange',
			}
		case 'core':
			return {
				border: '2px solid darkgreen',
				backgroundColor: 'darkgreen',
			};
		case 'tutor':
			return {
				border: '2px dotted darkorange',
				borderRadius: 'unset',
			}	
		default:
			return {
				// backgroundColor: 'gray',
				// border: '2px dotted gray',
			};
	}
}
</script>

<template>
    <div class="card" :class="{'played': card.played, 'echoed': card.echoed, 'gold': card.gold, 'unknown': card.unknown}"
            :style="getBgStyle(card)" @click="onClick()" @contextmenu="onRightClick($event)">
        <div class="card-info" :style="{'display': showNames ? 'flex' : 'none'}">
            <div class="card-info__prov">{{ card.unknown ? '' : card.prov }}</div>
            <div class="card-info__name">{{ card.unknown ? '?' : card.name }}</div>
        </div>
        <div class="card-category" :style="getStyleByCategory(card)"></div>
    </div>
</template>

<style>
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