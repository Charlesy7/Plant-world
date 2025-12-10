addLayer("p", {
    name: "key compression", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#928989",
    requires: new Decimal(6), // Can be a function that takes requirement increases into account
    resource: "compressed keys", // Name of prestige currency
    baseResource: "basic keys", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.45, // Prestige currency exponent
   
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 21)) mult = mult.times(upgradeEffect('p', 21))
        if (hasUpgrade('l', 13)) mult = mult.times(upgradeEffect('l', 13))
        if (hasMilestone('l', 1)) mult = mult.times(1.15)
        if (inChallenge('l', 11)) mult = mult.times(0.1)
        if (hasUpgrade('p', 23)) mult = mult.times(1.09)
        if (hasChallenge('l', 12)) mult = mult.times(1.5)
        if (hasMilestone('g', 1)) mult = mult.times(1.5)
        if (hasUpgrade('p', 24)) mult = mult.times(2)
        if (hasUpgrade('p', 31)) mult = mult.times(upgradeEffect('p', 31))  
        mult = mult.times(player.m.magicMastery.pow(0.3).add(1))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for compressed keys", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},     
    passiveGeneration(){
        let Ckeygain = new Decimal(0)
        return Ckeygain
    },
    upgrades: {
        11: {
            title: "Energetic Key",
            description: "Double your basic key gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Learning From Experience",
            description: "Increase your basic key gain based on compressed keys.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.15).add(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
        },
        13: {
            title: "Faster Compression",
            description: "Increase your compressed key gain based on basic keys.",
            cost: new Decimal(6),
            effect() {
                return player.points.add(1).pow(0.07).add(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            },
        14: {
            title: "Energetic Key II",
            description: "Multiply basic key gain by 1.5",
            cost: new Decimal(30),
        },   
        21: {
            title: "Even Faster Compression",
            description: "Increase your compressed key gain based on basic keys.",
            cost: new Decimal(75),
            effect() {
                return player.points.add(1).pow(0.03).add(0.08)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            },
        22: {
            title: "Energetic Key III",
            description: "Multiply basic key gain by 1.25",
            cost: new Decimal(250),    
            },   
        23: {
            title: "Imaginary Key I",
            description: "Multiply basic, compressed and living key gain by 1.09",
            cost: new Decimal(1500),    
            },       
        24: {
            title: "The Press I",
            description: "Double Compressed Key Gain",
            cost: new Decimal(250000),    
            },
        31: {
            title: "Super Synergy I",
            description: "Basic keys boost themself, compressed keys, and living keys",
            cost: new Decimal(2500000),  
            unlocked(){ if (hasMilestone('g', 2))return true }, 
            effect() {
                return player.points.add(1).pow(0.015)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            }, 
        32: {
            title: "Magic Up I",
            description: "multiply key mana gain by 1.5",
            cost: new Decimal(25000000),  
            unlocked() { if (hasMilestone('g', 2))return true }
            },
        33: {
            title: "Raise I",
            description: "Raise basic key gain by ^1.01",
            cost: new Decimal(70000000),  
            unlocked() { if (hasMilestone('g', 2))return true }
            },                                                          
        },
        autoUpgrade() { if (hasMilestone('g', 1))return true },
        tabFormat: [
            "main-display",
            "prestige-button",
            "blank",
            "blank",
            ["toggle", ["c", "beep"]],
            "milestones",
            "blank",
            "blank",
            "upgrades"
        ]
})

addLayer("l", {
    name: "create living keys", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        livingkeys: new Decimal(0),
    }},
    color: "#4d8435",
    requires: new Decimal(25), // Can be a function that takes requirement increases into account
    resource: "living keys", // Name of prestige currency
    baseResource: "compressed keys", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('l', 15)) mult = mult.times(upgradeEffect('l', 15))
        if (hasUpgrade('p', 23)) mult = mult.times(1.09)
        if (hasMilestone('l', 4)) mult = mult.times(1.33)
        if (hasChallenge('l', 12)) mult = mult.times(1.4)
        if (hasMilestone('g', 1)) mult = mult.times(1.5)
        if (hasUpgrade('l', 21)) mult = mult.times(upgradeEffect('l', 21))
        if (hasUpgrade('p', 31)) mult = mult.times(upgradeEffect('p', 31))
        if (hasUpgrade('l', 22)) mult = mult.times(upgradeEffect('l', 22))
        if (hasMilestone('g', 4)) mult = mult.times(1.75)
        
        mult = mult.times(player.m.lifeBooster.pow(0.15).add(1))
        
        
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for living keys", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration(){
        let Lkeygain = new Decimal(0)
        return Lkeygain
    },    
    upgrades: {
        11: {
            title: "Living Energetic Key",
            description: "Multiply your basic key gain by 2.02.",
            cost: new Decimal(1),
        },
        12: {
            title: "Key Golem",
            description: "Basic keys boost themselves, But also halves base basic key gain",
            cost: new Decimal(3),
            effect() {
                return player.points.add(1).pow(0.16)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect    
            },
        13: {
            title: "Learning From Life Experience",
            description: "Increase your compressed key gain based on living keys.",
            cost: new Decimal(4),
            effect() {
                return player.l.points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect  
        },  
        14: {
            title: "Basic Life",
            description: "Increase your basic key gain based on living keys.",
            cost: new Decimal(120),
            effect() {
                return player.l.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },  
        15: {
            title: "Double Life",
            description: "Increase your living key gain based on living keys.",
            cost: new Decimal(1250),
            effect() {
                return player.l.points.add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        }, 
        21: {
            title: "Magical Life",
            description: "Increase your living key gain based on Key Magic.",
            cost: new Decimal(5500),
            unlocked() { if (hasMilestone('g', 2))return true },
            effect() {
                return player.m.points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "Triple Life",
            description: "Increase your living key gain based on living keys. Again.",
            cost: new Decimal(12000),
            effect() {
                return player.l.points.add(1).pow(0.04)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },  
        
        
    },   
    milestones: {
        1: {
            requirementDescription: "2 Living Keys",
            effectDescription: "1.15x boost to basic and compressed keys",   
            done() { return player.l.points.gte(2) }
        },
        2: {
            requirementDescription: "4 Living Keys",
            effectDescription: "Unlock Key Magic",
            done() { return player.l.points.gte(4) }
        },
        3: {
            requirementDescription: "20 Living Keys",
            effectDescription: "3x increase to key mana gain",
            done() { return player.l.points.gte(20) }
        },
        4: {
            requirementDescription: "240 Living Keys",
            effectDescription: "1.33x boost to compressed key gain",
            done() { return player.l.points.gte(240)},
         },
        5: {
            requirementDescription: "720 Living Keys",
            effectDescription: "1.22x boost to living key gain",
            done() { return player.l.points.gte(720)},
         },
        6: {
            requirementDescription: "1600 Living Keys",
            effectDescription: "Unlock Gates",
            done() { return player.l.points.gte(1600)},
         },
    },
    challenges: {
        11: {
            name: "Broken Forge",
            challengeDescription: "Basic and compressed key gain is 10 times lower",
            goalDescription: "18 Basic Keys",
            rewardDescription: "Multiplies basic key gain by 2x",
            canComplete: function() {return player.points.gte(18)},
            
        },
        12: {
            name: "More Is Less",
            challengeDescription: "Basic and compressed keys decrease their own gain",
            goalDescription: "33,333 Basic Keys",
            rewardDescription: "1.4x living key gain, 1.5x compressed key gain, 1.6x basic key gain",

            canComplete: function() {return player.points.gte(33333)},
            
        },
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "blank",
        ["toggle", ["c", "beep"]],
        "milestones",
        "blank",
        "blank",
        "upgrades",
        "blank",
        "blank",
        "challenges"
    ]
    
    
      
})
addLayer("m", {
    
    startData() { return {                  
        unlocked: false,                     
        points: new Decimal(0),
        keyMana: new Decimal(0),
        magicMastery: new Decimal(0),
        sparks: new Decimal(0),
        lifeBooster: new Decimal(0),
    }},
    

    color: "#8E0AB5",                       // The color for this layer, which affects many elements.
    resource: "key magic",
               
    row: 1,                                  // The row this layer is on (0 is the first row).
    baseResource: "living keys",
    base: 10,                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.l.points },  // A function to return the current amount of baseResource.
    requires: new Decimal(4),              // The amount of the base needed to  gain 1 of the prestige currency.
                                        // Also the amount required to unlock the layer.
    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.5,                          // "normal" prestige gain is (currency^exponent).
    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { if (hasMilestone('l', 2))return true },          // Returns a bool for if this layer's node should be visible in the tree.
    upgrades: {
        
    },
    clickables: {
        11: {
            canClick() {return player.m.keyMana.gte(20)},
            display() {
                return "Sparker - Spend 20 Key Mana to create sparks. Sparks disappear over time, at a rate that gets faster based on your current sparks" 
            },
            onClick() {
                 player.m.sparks = player.m.sparks.add(1)
                 player.m.keyMana = player.m.keyMana.sub(20);
                 player.m.magicMastery = player.m.magicMastery.add(1);
            }
           },
        12: {
            canClick() {return player.m.keyMana.gte(15)},
            display() {
                return "Boost Life - Spend 15 Key Mana to create 1 Life Booster"
            },
            onClick() {
                player.m.lifeBooster = player.m.lifeBooster.add(1)
                player.m.keyMana = player.m.keyMana.sub(15);
                player.m.magicMastery = player.m.magicMastery.add(1);
            }
        },
        
   
    },
    
 
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "blank",
        "clickables",
        "blank",
        ["display-text",
        function() { return 'You have ' + format(player.m.keyMana) + ' Key Mana' },
        { "color": "cyan", "font-size": "28px", "font-family": "Libre Baskerville" }], 
        ["display-text",
        function() { return 'You have ' + format(player.m.sparks) + ' Sparks' },
        { "color": "red", "font-size": "24px", "font-family": "Libre Baskerville" }], 
        ["display-text",
        function() { return 'You have ' + format(player.m.lifeBooster) + ' Life Boosters' },
        { "color": "green", "font-size": "24px", "font-family": "Libre Baskerville" }],
        ["display-text",
        function() { return 'You have ' + format(player.m.generationBooster) + ' Generation Boosters' },
        { "color": "gray", "font-size": "24px", "font-family": "Libre Baskerville" }],  
        ["display-text",
        function() { return 'You have ' + format(player.m.magicMastery) + ' Magic Mastery ' },
        { "color": "purple", "font-size": "24px", "font-family": "Whisper, cursive;" }],
        ["display-text",
        function() { return 'Your magic mastery boosts Basic Key Gain by ' + format(player.m.magicMastery.pow(0.8).add(1)) + 'x' },
        { "color": "purple", "font-size": "17px", "font-family": "Libre Baskerville" }], 
        ["display-text",
        function() { return 'Your magic mastery also boosts Compressed Key Gain by ' + format(player.m.magicMastery.pow(0.3).add(1)) + 'x' },
        { "color": "purple", "font-size": "17px", "font-family": "Libre Baskerville" }], 
        ["display-text",
        function() { return 'Your sparks boost your Basic Key gain by ' + format(player.m.sparks.pow(0.3).add(1)) + 'x' },
        { "color": "red", "font-size": "17px", "font-family": "Libre Baskerville" }], 
        ["display-text",
        function() { return 'Your Life Boosters boost your Living Key gain by ' + format(player.m.lifeBooster.pow(0.15).add(1)) + 'x' },
        { "color": "green", "font-size": "17px", "font-family": "Libre Baskerville" }], 
        ["display-text",
        function() { return 'Your Generation Boosters boost your passive key gains by ' + format(player.m.generationBooster.pow(0.15).add(1)) + 'x' },
        { "color": "gray", "font-size": "17px", "font-family": "Libre Baskerville" }], 
        "blank",
        ["toggle", ["c", "beep"]],
        "milestones",
        "blank",
        "blank",
        "upgrades",
        "bars" 
    ],
    update(diff) {
        if (hasMilestone ('l', 2)) {
        keyManaGain = new Decimal(0.15)
        keyManaGain = keyManaGain.times(player.m.points)
        if (hasMilestone ('l',3)) keyManaGain = keyManaGain.times(3)
        if (hasUpgrade('p', 32)) keyManaGain = keyManaGain.times(1.5)
        if (hasMilestone ('g',5)) keyManaGain = keyManaGain.times(1.25)
        player.m.keyMana = player.m.keyMana.add(keyManaGain.times(diff));
        sparksGain = new Decimal(-0.5)
        sparksGain = sparksGain.times(player.m.sparks)
        player.m.sparks = player.m.sparks.add(sparksGain.times(diff));
        
        
        
    }
        
}          
    
})
addLayer("g", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),
                    // "points" is the internal name for the main resource of the layer.
    }},

    color: "brown",                       // The color for this layer, which affects many elements.
    resource: "Gates Opened",            // The name of this layer's main prestige resource.
    row: 2,                                 // The row this layer is on (0 is the first row).

    baseResource: "Living Keys",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.l.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(1600),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 5,
    directMult: 1,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
        "blank",
        ["toggle", ["c", "beep"]],
        "milestones",
        "buyables",
        "blank",
        
        "upgrades",
        "blank",
        "blank",
        "challenges"
    ],

    layerShown() { if (hasMilestone('l', 6))return true}
    ,         // Returns a bool for if this layer's node should be visible in the tree.

    milestones: {
        1: {
            requirementDescription: "1 Gate Opened",
            effectDescription: "you automatically buy compressed key upgrades, 2 times basic key gain, and 1.5 times compressed and living key gain",
            done() { return player.g.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Gates Opened",
            effectDescription: "unlock 3 new compressed key upgrades and 2 new living key upgrades, gain 2% of compressed key gain per second ",
            done() { return player.g.points.gte(2) }
        },
        3: {
            requirementDescription: "3 Gates Opened",
            effectDescription: "10x basic key gain under 22222 basic keys, 2.5x basic key gain above 666,666",
            done() { return player.g.points.gte(3) }
        },
        4: {
            requirementDescription: "4 Gates Opened",
            effectDescription: "1.75 times living key gain, gain 6% of living key gain a second",
            done() { return player.g.points.gte(4) }
        },
        5: {
            requirementDescription: "5 Gates Opened",
            effectDescription: "Unlock a new key magic spell, 1.25x Key Mana gain",
            done() { return player.g.points.gte(5) }
        },
        
        
    },
    
        update(diff){
            
        },
    
})

