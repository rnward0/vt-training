import { defer, repeat, Observable } from "rxjs";
import inquirer from "inquirer";

type State = {
  isOrange: boolean;
};

type Command = {
  value: string;
};

class Consumer {
  state: State[] = [];

  constructor(state: State, actions: Observable<Command>) {
    this.state.push(state);
    const subscription = actions.subscribe((command) => {
      const newState = this.update(command);
      this.state.push(newState);
    });
    setTimeout(() => subscription.unsubscribe(), 100000);
  }

  view(newState: State) {
    if (newState.isOrange) {
      console.log("The color is orange!");
    } else {
      console.log("This color is not orange!");
    }
  }

  update(command: Command): State {
    const newState = this.reducer(command);
    this.view(newState);
    return newState;
  }

  reducer(command: Command): State {
    return {
      isOrange: command.value === "FFA500",
    };
  }
}

const source = defer(() =>
  inquirer.prompt([
    {
      type: "input",
      name: "value",
      message: "Enter color in hex: ",
    },
  ])
);

const app = source.pipe(repeat());

new Consumer({ isOrange: false }, app);
