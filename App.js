import React, { Component } from 'react';
import './App.css';
import animals from './animals.json'
import Wrapper from './components/Wrapper'
import Navpills from './components/Navpills'
import Title from './components/Title'
import AnimalCard from './components/AnimalCard'

class App extends Component {
    state = {
        message: "Click an image to begin!",
        topScore: 0,
        curScore: 0,
        animals: animals,
        unselectedAnimals: animals
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectAnimal = type => {
        const findAnimal = this.state.unselectedAnimal.find(item => item.type === type);

        if(findAnimal === undefined) {
            // failure to select a new animal
            this.setState({ 
                message: "Incorrect!",
                topScore: (this.state.curScore > this.state.topScore) ? this.state.curScore : this.state.topScore,
                curScore: 0,
                animal: animal,
                unselectedAnimals: animals
            });
        }
        else {
            // success selecting a new animal
            const newAnimals = this.state.unselectedAnimals.filter(item => item.type !== type);
            
            this.setState({ 
                message: "Correct!",
                curScore: this.state.curScore + 1,
                animals: animals,
                unselectedAnimals: newAnimals
            });
        }

        this.shuffleArray(animals);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    curScore={this.state.curScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.animals.map(animal => (
                        <AnimalCard
                            type={animal.type}
                            image={animal.image}
                            selectAnimal={this.selectAnimal} 
                            curScore={this.state.curScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;
