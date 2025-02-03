import { useRef } from "react";
import TooltipButton from "../../Tooltip/Tooltip";
import ThingLinkZoom from "../../ThingLinkZoom/ThingLinkZoom";
import FINAL_FANTASY_JOBS from "../../../assets/ffxiv_jobs.png";
import ThingLinkZoomItemPreview from "../../ThingLinkZoomPreview/ThingLinkZoomPreview";
import "./AssignmentExample.scss";
import "../../ThingLinkZoom/ThingLinkZoom.scss";

export default function AssignmentExample2() {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <ThingLinkZoom>
      <div
        style={{
          position: "relative",
          height: `calc(${imageRef.current?.offsetHeight} + 1px)`,
          width: `calc(${imageRef.current?.offsetWidth} + 1px)`,
          margin: "auto",
        }}
      >
        <img
          src={FINAL_FANTASY_JOBS}
          alt="Final Fantasy XIV playable classes"
          ref={imageRef}
        />
        {items.map((item, index) => (
          <div
            id={`thinglink-spot-${item.id}`}
            key={item.id}
            className="thinglink-spot"
            style={{ top: item.y, left: item.x }}
          >
            <TooltipButton
              text={index.toString()}
              tooltip={<ThingLinkZoomItemPreview item={item} />}
              containerRef={imageRef}
              onClick={() => console.log("derp")}
            />
          </div>
        ))}
      </div>
    </ThingLinkZoom>
  );
}

const items = [
  {
    id: "sCePq1fpcx",
    x: "10%",
    y: "20%",
    image:
      "https://lds-img.finalfantasyxiv.com/promo/h/b/ZwJFxv3XnfqB5N6tKbgXKnj6BU.png",
    title: "Summoner - Magical Ranged DPS",
    description:
      "The beast tribes of Eorzea worship and summon forth beings known as primals, among which are Ifrit, Garuda, and Titan. Yet what is a god to one man is a demon to another, for the city-states of Eorzea see these beings as a grave threat to their collective survival. In times immemorial, there lived mages who had not only the power to summon the primals, but also the means to transmute",
  },
  {
    id: "1Zl01h55hr",
    x: "18%",
    y: "65%",
    image:
      "https://lds-img.finalfantasyxiv.com/promo/h/b/d7BM1x8OZRZU-9fTk-D7g1t2oc.png",
    title: "Bard - Physical Ranged DPS",
    description:
      "The word 'bard' ordinarily puts folk in mind of those itinerant minstrels, fair of voice and nimble of finger, who earn their coin performing in taverns and the halls of great lords. Few know, however, that bards in fact trace their origins back to the bowmen of eld, who sang in the heat of battle to fortify the spirits of their companions. In time, their impassioned songs came to hold sway over the hearts of men, inspiring their comrades to great feats and granting peace unto those who lay upon the precipice of death.",
  },
  {
    id: "U4H2JxfsQt",
    x: "33%",
    y: "10%",
    image:
      "https://lds-img.finalfantasyxiv.com/promo/h/1/zWRkXGJIJhN7WHGGv1gVscRxmA.png",
    title: "Dragoon - Melee DPS",
    description:
      "Of all the things that are symbolic of the nation of Ishgard, few are more recognized than the dragoon. Born amidst the timeless conflict between men and dragons, these lance-wielding knights have developed an aerial style of combat, that they might better pierce the scaled hides of their mortal foes. Taking to the firmament as though it were an extension of the land, they descend upon the enemy with every onze of their bodies behind the blow. It is this penetrative power that characterizes the dragoon.",
  },
  {
    id: "NlAbUc0gKr",
    x: "31%",
    y: "92%",
    image:
      "https://lds-img.finalfantasyxiv.com/promo/h/G/Na619RGtVtbEvNn1vyFoSlvZ84.png",
    title: "White Mage - Healer",
    description:
      "White magic, the arcane art of succor, was conceived eras past that the world might know comfort. Alas, man began perverting its powers for self-gain, and by his wickedness brought about the Sixth Umbral catastrophe. Although the art subsequently became forbidden, it is now in the midst of a revival at the hands of the Padjal, chosen of the elementals. Those who would walk the path of the white mage are healers without peer, possessed of the power to deliver comrades from the direst of afflictions—even the icy grip of death itself.",
  },
  {
    id: "tc6H3aKb43",
    x: "53%",
    y: "18%",
    image:
      "https://lds-img.finalfantasyxiv.com/promo/h/V/NUXU4h6iXzF8HS4BxHKYf7vOa0.png",
    title: "Paladin - Tank",
    description:
      "For centuries, the elite of the Sultansworn have served as personal bodyguards to the royal family of Ul'dah. Known as paladins, these men and women marry exquisite swordplay with stalwart shieldwork to create a style of combat uncompromising in its defense. Clad in brilliant silver armor, they charge fearlessly into battle, ever ready to lay down their lives for their liege. To be a paladin is to protect, and those who choose to walk this path will become the iron foundation upon which the party's defense is built.",
  },
  {
    id: "d8ynTPrYr5",
    x: "63%",
    y: "21%",
    image:
      "https://lds-img.finalfantasyxiv.com/promo/h/0/U3f8Q98TbAeGvg_vXiHGOaa2d4.png",
    title: "Warrior - Tank",
    description:
      "On the northernmost edge of Abalathia's Spine exists a mountain tribe renowned for producing fearsome mercenaries. Wielding greataxes and known as warriors, these men and women learn to harness their inner-beasts and translate that power to unbridled savagery on the battlefield. In former times which saw war waged ceaselessly in Eorzea, the warriors featured prominently on the front lines of battle. With the arrival of peacetime, however, their art has descended into the shadows of obscurity, where it remains to this day.",
  },
  {
    id: "oX4syjaTxM",
    x: "76%",
    y: "14%",
    image:
      "https://lds-img.finalfantasyxiv.com/promo/h/A/7JuT00VSwaFqTfcTYUCUnGPFQE.png",
    title: "Black Mage - Magical Ranged DPS",
    description:
      "In days long past, there existed an occult and arcane art known as black magic—a potent magic of pure destructive force born forth by a sorceress of unparalleled power. Those who learned to wield this instrument of ruin came to be called black mages, out of both fear and respect for their gift. Yet great power served to corrupt the judgment of mortal man, and so he unknowingly set out upon the path of ruin. Adventurers who take the black will become agents of devastation, capable of annihilating those who oppose them through little more than the force of their will.",
  },
  {
    id: "BGyVkWEgaW",
    x: "91%",
    y: "22%",
    image:
      "https://lds-img.finalfantasyxiv.com/promo/h/C/Ce_VQB6VPPJKTGJwxf3h5iujp4.png",
    title: "Monk - Melee DPS",
    description:
      "Though now under Garlean rule, the city-state of Ala Mhigo once boasted the greatest military might of all Eorzea. Among its standing armies were the monks—ascetic warriors as dreaded by foes on the field of battle as the city-state's great pikemen. The monks comprised an order known as the Fist of Rhalgr, and it was to this god—the Destroyer—that they devoted their lives of worship. By mastering seats of power within the body known as chakra, they are capable of performing extraordinary physical feats.",
  },
];
