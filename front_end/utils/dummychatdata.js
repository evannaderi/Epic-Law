const chatData = {
	conversation: {
		id: '123456',
		created: '2023-10-08T10:00:00Z',
		messages: [
			{
				role: 'system',
				content: 'Initializing conversation with OpenAI API.',
			},
			{
				role: 'user',
				content: 'Hello OpenAI! Can you tell me about the solar system?',
			},
			{
				role: 'assistant',
				content:
					'Of course! The solar system consists of the Sun and the celestial objects gravitationally bound to it: the eight planets, their moons, dwarf planets, and numerous small bodies such as asteroids and comets. Would you like to know about a specific planet?',
			},
			{
				role: 'user',
				content: 'Yes, tell me about Jupiter.',
			},
			{
				role: 'assistant',
				content:
					'Jupiter is the largest planet in our solar system and is known as a gas giant. It has a very strong magnetic field, more than twice as strong as any other planet in the solar system. Jupiter has at least 79 known moons, with the largest one being Ganymede. The planet is also known for its Great Red Spot, which is a giant storm that has been raging for at least 400 years. Would you like more details?',
			},
			{
				role: 'user',
				content: 'How about its rings? I heard Jupiter has rings too.',
			},
			{
				role: 'assistant',
				content:
					"Yes, that's correct! While Jupiter's rings are not as prominent as those of Saturn, it does have a ring system. The rings of Jupiter are primarily composed of dust particles that are likely ejected from some of its moons due to the impact of meteoroids. These rings are faint and are mainly made up of three parts: the innermost 'halo ring', the main 'thin ring', and the outermost 'gossamer rings'. They were first discovered in 1979 by NASA's Voyager 1 spacecraft.",
			},
			{
				role: 'user',
				content:
					"That's fascinating! Can you also share some information about black holes?",
			},
			{
				role: 'assistant',
				content:
					"Certainly! Black holes are regions in space where the gravitational pull is so strong that not even light can escape. They form when massive stars collapse at the end of their life cycles. The core contracts and the outer layers are expelled, and the core's gravity increases, pulling everything into a small, infinitely dense point known as a singularity. There are a few different types of black holes: stellar black holes, supermassive black holes, and primordial black holes. Their properties and formation processes vary, but all share the characteristic of having such a strong gravitational effect that nothing, not even light, can escape their grasp.",
			},
			{
				role: 'user',
				content: "Thank you for the information! You're a great assistant.",
			},
			{
				role: 'assistant',
				content:
					"You're welcome! If you have any more questions, feel free to ask. Have a great day!",
			},
		],
	},
};

const caseData = [
	{
		caseNumber: '123456',
		clientName: 'John Doe',
		tag: 'medical malpractice',
	},
	{
		caseNumber: '123457',
		clientName: 'Jane Doe',
		tag: 'personal injury',
	},
	{
		caseNumber: '123458',
		clientName: 'Jacky Doe',
		tag: 'domestic violence',
	},
	{
		caseNumber: '123456',
		clientName: 'John Doe',
		tag: 'medical malpractice',
	},
	{
		caseNumber: '123457',
		clientName: 'Jane Doe',
		tag: 'personal injury',
	},
	{
		caseNumber: '123458',
		clientName: 'Jacky Doe',
		tag: 'domestic violence',
	},
];

export { chatData, caseData };
