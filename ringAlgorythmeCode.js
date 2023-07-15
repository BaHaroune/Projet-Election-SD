// Classe représentant un processus dans le réseau
class Process {
  constructor(id) {
    this.id = id;
    this.isCoordinator = false;
    this.nextProcess = null;
  }

  // Définit le processus suivant dans l'anneau
  setNextProcess(nextProcess) {
    this.nextProcess = nextProcess;
  }

  // Démarre le processus d'élection du coordinateur
  startElection() {
    console.log(`Process ${this.id} starts election`);
    if (!this.isCoordinator) {
      this.sendElectionMessage(this.id);
    }
  }

  // Envoie un message de type "election" au processus suivant dans l'anneau
  sendElectionMessage(senderId) {
    console.log(`Process ${senderId} sends election message to process ${this.nextProcess.id}`);
    this.nextProcess.receiveElectionMessage(senderId);
  }

  // Réception d'un message de type "election"
  receiveElectionMessage(senderId) {
    if (!this.isCoordinator) {
      if (senderId < this.id) {
        console.log(`Process ${this.id} forwards election message to process ${this.nextProcess.id}`);
        this.sendElectionMessage(senderId);
      } else if (senderId > this.id) {
        console.log(`Process ${this.id} becomes the coordinator`);
        this.isCoordinator = true;
        console.log(`Process ${this.id} sends answer message to process ${senderId}`);
        processes[senderId].receiveAnswerMessage();
      }
    }
  }

  // Réception d'un message de type "answer"
  receiveAnswerMessage() {
    console.log(`Process ${this.id} receives answer message`);
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

// Configure les processus pour former un anneau
for (let i = 0; i < processes.length; i++) {
  const currentProcess = processes[i];
  const nextProcess = processes[(i + 1) % processes.length];
  currentProcess.setNextProcess(nextProcess);
}

// Lance l'élection avec le processus ayant l'identifiant le plus bas
const lowestIdProcess = processes.reduce((lowest, process) => process.id < lowest.id ? process : lowest);
lowestIdProcess.startElection();
