interface IQuest {
  id: string;
  label: string;
  type: string;
}

class Quest implements IQuest {
  id: string;
  label: string;
  type: string;

  constructor({ id, label, type }: Quest) {
    this.id = id;
    this.label = label;
    this.type = type;
  }
}

export class SideQuest extends Quest {}

export class MainQuest extends Quest {
  multiply: boolean;

  constructor({ id, label, type, multiply }: Quest & { multiply: boolean }) {
    super({ id, label, type });
    this.multiply = multiply;
  }
}
