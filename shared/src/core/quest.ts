interface IABQuest {
  id: string;
  label: string;
  type: string;
}

class ABQuest implements IABQuest {
  readonly id: string;
  readonly label: string;
  readonly type: string;

  constructor({ id, label, type }: IABQuest) {
    this.id = id;
    this.label = label;
    this.type = type;
  }
}

export class ABSideQuest extends ABQuest {}

export class ABMainQuest extends ABQuest {
  multiply: boolean;

  constructor({ id, label, type, multiply }: ABQuest & { multiply: boolean }) {
    super({ id, label, type });
    this.multiply = multiply;
  }
}
