import "./App.scss";
import { Header } from "./Components/Header";
import { TasksContainer } from "./Components/Tasks/TasksContainer";

function App() {
  return (
    <div className="App">
      <Header />
      <TasksContainer />
    </div>
  );
}

export default App;
