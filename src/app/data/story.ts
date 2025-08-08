import { StoryLevel } from "../interfaces/types";

export const story: Record<number, StoryLevel> = {
    1: {
      dialog: [
        "You awaken in a cold damp cell.",
        "A note lies beside you.",
        "Hello friend, my name is Sir Alaric. I am a paladin of the Holy Order, sent to purge the necromancer who resides in this tower.",
        "I found you unconscious and imprisoned.", "I healed your wounds with a minor blessing, but had to leave when the tower's alarms triggered.",
        "Follow the instructions in this note to escape. Do not linger.",
        "You look at the door and it seems to really be unlocked.",
        "Now is the time to decide. Do you follow the paladin's instructions to leave, or venture deeper into the tower?"
      ],
      choices: ["Leave the tower", "Go deeper into the tower"]
    },
    1.1:{
      dialog: [
        "In your hurry to escape you miss one of the traps protecting the exit.","There was no warning, the last thing you see is your body tumbling infront of your eyes before the darkness claims your conciousness."
      ],
      choices: ["Game Over"]
    },
      
    2: {
      dialog: [
        "You step into the dim corridor beyond the cell.",
        "The air is thick with dust and the scent of decay.",
        "On the wall hangs a sturdy rope, frayed but usable.",
        "It might come in handy later."
      ],
      choices: ["Take the rope", "Leave the rope"]
    },
  
    3: {
      dialog: [
        "You ascend a winding staircase, the stones slick with moss.",
        "Suddenly, the path is blocked by a collapsed section of the tower.",
        "You could try to climb over it, but it looks treacherous.",
        "If you had a rope, you might be able to scale it quickly.",
        "Alternatively, you could take your time and search for another way around."
      ],
      choices: ["Use the rope to climb", "Take your time and search"]
    },
  
    4: {
      dialog: [
        "You carefully navigate the rubble, squeezing through narrow gaps.",
        "In one crevice, something glints faintly.",
        "You reach in and pull out a small vial labeled with ancient runes.",
        "It smells faintly of lavender and lightning.",
        "You feel a strange pull—perhaps drinking it would sharpen your mind."
      ],
      choices: ["Drink the elixir", "Ignore it and move on"]
    },
  
    5: {
      dialog: [
        "You continue upward, the tower growing colder and darker.",
        "You enter a chamber lit only by a single, ornate mirror.",
        "As you approach, your reflection begins to change—your skin withers, your hair grays, your eyes hollow.",
        "A whisper echoes in your mind: 'See yourself... as you truly are.'",
        "You feel compelled to keep watching, but something deep inside warns you to look away."
      ],
      choices: ["Keep looking into the mirror", "Look away and move on"]
    },
  
    5.1: {
      dialog: [
        "You stare into the mirror, unable to resist.",
        "Your body begins to decay in real time, your soul unraveling.",
        "The last thing you see is your own corpse reflected back at you.",
        "The tower claims another victim."
      ],
      choices: ["Game Over"]
    },
  
    5.2: {
      dialog: [
        "You tear your gaze away from the mirror just in time.",
        "The whispers fade, and the illusion breaks.",
        "You step past the cursed chamber, shaken but alive.",
        "Ahead lies the final ascent."
      ],
      choices: ["Enter the final chamber"]
    },
  
    6: {
      dialog: [
        "Inside the chamber lies a man—Rail—his legs severed, blood pooling beneath him.",
        "He groans and beckons you closer.",
        "'The necromancer... I tried to stop him. He’s dead now. Those charred remains over there... that was him.'",
        "'Take this crystal. It opens the door to his study. There’s treasure beyond imagining.'",
        "You sense something off. The wounds look like sword cuts, not magical burns.",
        "Could Rail be lying?"
      ],
      choices: [
        "Trust Rail and take the crystal",
        "Try to help Rail escape",
        "Investigate the charred remains instead"
      ]
    },
  
    6.1: {
      dialog: [
        "You approach the ornate door and hold up the crystal.",
        "It pulses with dark energy.",
        "Suddenly, it drains your strength, siphoning your life force.",
        "Across the room, the necromancer’s corpse twitches and begins to regenerate.",
        "'So easy to fool,' he whispers, eyes glowing with cruel delight.",
        "Your vision fades as the tower claims another soul."
      ],
      choices: ["Game Over"]
    },
  
    6.2: {
      dialog: [
        "You examine the charred remains and find a holy insignia.",
        "This was the real paladin.",
        "Rail’s wounds were a ruse—he’s no victim.",
        "You turn and strike him down before he can react.",
        "Among his belongings, you find rare trinkets and the true key to the necromancer’s study.",
        "You leave the tower, richer and wiser, the insignia clutched in your hand."
      ],
      choices: ["Victory – You survived and uncovered the truth"]
    }
  };