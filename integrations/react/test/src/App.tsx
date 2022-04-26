import { Coco } from "./components/Coco";
import { Zabu } from "./components/Zabu";

function App() {
	console.log("App is called");
	// const [count, setCount] = useState(0);
	// const [storeCount, setStoreCount] = getStore("zabu");

	return (
		<>
			<p>
				<Coco />
			</p>
			<p>
				<Zabu />
			</p>
			<p>
				<Zabu />
			</p>
		</>
	);
}

export default App;
