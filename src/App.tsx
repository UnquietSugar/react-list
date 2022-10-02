const App = () => {
	return (
		<div>
			<div className='center'>
				<button>Undo</button>
				<button>Clear</button>
				<button>Redo</button>
			</div>
			<div className='center'>
				<input type='text' />
			</div>
			<div className='center'>
				<button>Save</button>
			</div>
			<div className='list-container'>
				<ul>
					<li>Item 1</li>
					<li>Item 2</li>
					<li>Item 3</li>
					<li>Item 4</li>
				</ul>
			</div>
		</div>
	);
};

export default App;
