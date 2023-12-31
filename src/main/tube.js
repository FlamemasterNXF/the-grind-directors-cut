let tubeMilestones = [
    {
        req: 1e97,
        currency: () => data.number,
        effect: () => 3,
        desc: 'Raise Number gain to the 3rd Power',
        currencyName: 'Number'
    },
    {
        req: 7,
        currency: () => data.resets[2],
        effect: () => data.resets[0].plus(1).pow(getResetEffect(3)),
        desc: 'You may now Bulk Automate Reset 2 if you can afford at least one Reset 2, and each Reset 1 increases the Reset 2 Bulk Automate Amount by 1',
        currencyName: 'Reset 3'
    },
    {
        req: D("e1e100000"),
        currency: () => data.number,
        effect: () => D("e1e100").pow(data.resets[2]),
        desc: 'Reset 3 now raises Number gain to the e1e100th power',
        currencyName: 'Number'
    },
    {
        req: D("ee1e300"),
        currency: () => data.number,
        effect: () => 2,
        desc: 'Unlock the J',
        currencyName: 'Number'
    },
    {
        req: D("e1e308"),
        currency: () => data.j,
        effect: () => Decimal.max(1, Decimal.slog(data.j)),
        effect2: () => D(2).pow(data.jup[3]),
        desc: 'Raise Number gain to the Super Log of J, SPLIT no longer Resets <b>J</b> or REM�VE "Number", each SPLIT increases the <b>J</b> OBTAINING� Automator Bulk Amount by 1, and unlock Reset 5',
        currencyName: 'J'
    },
    {
        req: 1000,
        currency: () => data.resets[0],
        effect: () => D("e1e100").pow(data.resets[0]),
        desc: 'Apply the 2nd Infinity Tube Effect to Reset 1',
        currencyName: 'Reset 1'
    },
    {
        req: Infinity,
        currency: () => data.resets[0],
        effect: () => 1,
        desc: 'Nothing.',
        currencyName: ''
    },
]

function initTubeHTML() {
    const container = DOM('tubeMilestoneContainer')
    for (let i = 0; i < tubeMilestones.length-1; i++) {
        let el = document.createElement('t')
        el.className = 'tubeMilestone'
        el.id = `tubeMilestone${i}`
        el.innerHTML = `Upon your ${i+1}${i===0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'} Entry: ${tubeMilestones[i].desc}`
        el.style.color = data.infinityTubes > i ? 'darkgoldenrod' : 'gray'
        container.append(el)
    }
    updateInfinityTubeHTML()
}

function updateInfinityTubeHTML(){
    DOM(`tubeButton`).innerHTML = `<b>ENTER THE INFINITY TUBE</b><br>Reset all of your Resets and your Number in pursuit of Infinity.<br>Requires ${format(tubeMilestones[data.infinityTubes].req)} ${tubeMilestones[data.infinityTubes].currencyName}`
    DOM(`tubes`).innerText = `You have Entered the Infinity Tube ${data.infinityTubes} Times`
}

function enterInfinityTube(){
    if(tubeMilestones[data.infinityTubes].currency().lt(tubeMilestones[data.infinityTubes].req)) return
    for (let i = 0; i < resetData.length; i++) {
        data.resets[i] = D(0)
        updateResetHTML(i)
    }
    data.number = D(0)
    ++data.infinityTubes

    DOM(`tubeMilestone${data.infinityTubes-1}`).style.color = 'darkgoldenrod'
    updateInfinityTubeHTML()
}

let getInfinityTubeEffect = (i) => data.infinityTubes > i ? tubeMilestones[i].effect() : D(1)