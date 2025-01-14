import React from 'react';
import './App.css';
import { TechSkillProvider } from './contexts/TechSkillContext';
import { TechSkillModal } from './components/TechSkillModal/TechSkillModal';
import { tech } from './data/tech';

function App() {
	const [modalOpen, setModalOpen] = React.useState(false);

	return (
		<TechSkillProvider fullList={tech}>
			<h1 className="title">Select your top 5 tech skills</h1>
			{!modalOpen && (
				<button className="btn btn-primary" onClick={() => setModalOpen(true)}>
					Open Modal
				</button>
			)}
			<TechSkillModal show={modalOpen} onClose={() => setModalOpen(false)} />
		</TechSkillProvider>
	);
}

export default App;
