interface Quest {
  id: string;
  label: string;
  type: string;
}

class Quest implements Quest {
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
  options: number[];
  multiply: boolean;

  constructor({
    id,
    label,
    type,
    options,
    multiply,
  }: Quest & { options: number[]; multiply: boolean }) {
    super({ id, label, type });
    this.options = options;
    this.multiply = multiply;
  }
}
