import type { Deck } from "@/types";
import { c, d } from "./cards";

export const ImposterBall: Deck = {
    name: 'Imposter Ball',
    cards: [
        c('Masquerade Ball'),
        c('Admiral Rompally'),
        c('Ard Feainn'),
        c('Coup de Grace'),
        c('Joachim de Wett'),
        c('Vincent van Moorlehem'),
        c('Rosa and Edna'),
        c('Philippe van Moorlehem'),
        c('Fergus var Emreis'),
        c('Ceallach Dyffryn'),
        c('Roderick of Dun Tynne'),
        ...d('Alba Pikeman'),
        ...d('Thirsty Dame'),
        ...d('Seditious Aristocrats'),
        ...d('Fangs of the Empire'),
        ...d('Hunting Pack'),
        ...d('Van Moorlehem Servant'),
        ...d('Van Moorlehem Hunter'),

    ]
}

export const NRdevoMuto: Deck = {
    name: 'NR devo muto temple',
    cards: [
        c('Temple of Melitele'),
        c('King Demavend'),
        c('King Radovid V'),
        c('Raffard’s Vengeance'),
        c('Radovid Judgment'),
        c('Prince Anséis'),
        c('Mutagenerator'),
        c('Hubert Rejk'),
        ...d('Carroballista'),
        ...d('Lyrian Arbalest'),
        ...d('Lyrian Landsknecht'),
        ...d('Redanian Archer'),
        ...d('Reinforced Ballista'),
        ...d('Siege Master'),
        c('Battering Ram'),
        ...d('Kaedweni Revenant'),
        ...d('Winch'),
    ]
}

export const SYdevoYago: Deck = {
    name: 'SY devo yago',
    cards: [
        c('Madam Marquise Serenity'),
        c('King of Beggars'),
        c('Novigrad'),
        c('Captain Yago'),
        c('Korathi Heatwave'),
        c('Royal Decree'),
        c('The Flying Redanian'),
        c('Conjurers Candle'),
        c('Whoresons Freak Show'),
        c('Saul de Navarette'),
        c('Hvitr and Aelydia'),
        c('Shady Vendor'),
        c('Sly Seductress'),
        
        ...d('Bare-Knuckle Brawler'),
        ...d('Eventide Plunder'),
        ...d('Fisstech'),
        ...d('Fisstech Trafficker'),
        ...d('Passiflora Peaches'),
        ...d('Sewer Raiders'),
    ]
}

export const MetaDecks: Deck[] = [
    ImposterBall,
    NRdevoMuto,
    SYdevoYago
];
