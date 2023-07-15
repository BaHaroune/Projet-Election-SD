// Classe représentant un processus dans le réseau
class Process {
  constructor(id) {
    this.id = id;
    this.isCoordinator = false;
  }

  // Envoie un message de type "election" à tous les processus ayant un identifiant supérieur
  sendElectionMessage() {
    const higherProcesses = processes.filter(process => process.id > this.id);
    higherProcesses.forEach(process => {
      console.log(`Process ${this.id} sends election message to process ${process.id}`);
      process.receiveElectionMessage(this.id);
    });
  }

  // Réception d'un message de type "election"
  receiveElectionMessage(senderId) {
    console.log(`Process ${this.id} receives election message from process ${senderId}`);
    if (!this.isCoordinator) {
      console.log(`Process ${this.id} sends answer message to process ${senderId}`);
      processes[senderId].receiveAnswerMessage();
    }
  }

  // Réception d'un message de type "answer"
  receiveAnswerMessage() {
    console.log(`Process ${this.id} receives answer message`);
    this.isCoordinator = false;
  }

  // Lance le processus d'élection du coordinateur
  startElection() {
    console.log(`Process ${this.id} starts election`);
    this.sendElectionMessage();
    this.isCoordinator = true;
    console.log(`Process ${this.id} becomes the coordinator`);
  }
}

// Crée quelques processus pour l'exemple
const processes = [
  new Process(0),
  new Process(1),
  new Process(2),
  new Process(3),
  new Process(4)
];

// Lance l'élection avec le processus ayant l'identifiant le plus bas
const lowestIdProcess = processes.reduce((lowest, process) => process.id < lowest.id ? process : lowest);
lowestIdProcess.startElection();
