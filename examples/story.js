var metadata = { title: "BB84", author: "Alan Zhu", date: "2021",
instructions: "Click below or add your own parameters to the URL to change the “spin” and to create variation in the narrative discourse. You have to use the official names of “actors” for i (narrator) and you (narratee). These can be found by looking at the code. Examples:",
examples: [ "main=0-4;9-17", "" ] };

// PLACES first
place.channel = new Place("a", "normal channel");
place.quantumchannel = new Place("a", "quantum channel");

// ACTORS next
actor.alice = new Actor("", "Alice", spatial.in, place.channel, pronoun.feminine);
actor.bob = new Actor("", "Bob", spatial.in, place.channel, pronoun.nonBinary);
actor.eve = new Actor("", "Eve", spatial.in, place.channel, pronoun.feminine);

// THINGS next
thing.bitsA = new Thing("a", "string of bits, A", spatial.of, actor.alice);
thing.bitsB = new Thing("a", "string of bits, B", spatial.of, actor.alice);
thing.bitsAprime = new Thing("a", "string of bits, A'", spatial.of, actor.bob);
thing.bitsBprime = new Thing("a", "string of bits, B'", spatial.of, actor.bob);
thing.qubits = new Thing("a", "string of qubits", spatial.of, actor.alice);

// Finally, EVENTS
var CREATE_A = new Event(actor.alice, "create", thing.bitsA);
var CREATE_B = new Event(actor.alice, "create", thing.bitsB);
var COMBINE_AB = new Event(actor.alice, "combine", [thing.bitsA, thing.bitsB]);
var COMBINED = new Event([thing.bitsA, thing.bitsB], "make", thing.qubits);
var SEND_AB = new Event(actor.alice, "send", thing.qubits, temporal.into, place.quantumchannel);
var INTERCEPTION = new Event(actor.eve, "intercept", thing.qubits);
var INTERCEPTION_MEASURE = new Event(actor.eve, "measure", thing.qubits);
var INTERCEPTION_DISRUPT = new Event(actor.eve, "disrupt", thing.qubits);
var SEND_AB_DISRUPTED = new Event(actor.eve, "send", thing.qubits, temporal.to, actor.bob);
var BOB_RECEIVE = new Event(actor.bob, "receive", thing.qubits);
var BOB_GUESS = new Event(actor.bob, "guess", thing.bitsBprime, temporal.for, thing.bitsB);
var BOB_REMOVE_B = new Event(actor.bob, "remove", thing.bitsBprime, temporal.from, thing.qubits);
var BOB_CREATE = new Event([thing.bitsBprime, thing.qubits], "make", thing.bitsAprime);
var CHECK = new Event([actor.bob, actor.alice], "check", thing.bitsBprime, temporal.with, thing.bitsB);
var REMOVE_MISMATCH = new Event([actor.bob, actor.alice], "remove mismatched bits", null, temporal.from, [thing.bitsA, thing.bitsAprime]);
var CHECK_A = new Event([actor.bob, actor.alice], "check half of", [thing.bitsA, thing.bitsAprime]);
var MISMATCH = new Event([thing.bitsA, thing.bitsAprime], "do not match", null);
var REJECT = new Event([actor.bob, actor.alice], "reject the communication", null);

var world = new World(place, actor, thing, eventSeq);
function run() { narrate(metadata, {}, world); }