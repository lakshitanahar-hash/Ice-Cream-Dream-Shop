import { useState } from 'react';
import { ConeTray } from './components/ConeTray';
import { DraggableCone } from './components/DraggableCone';
import { SoftServeMachine } from './components/SoftServeMachine';
import { ChocolateBowl } from './components/ChocolateBowl';
import { ToppingContainer } from './components/ToppingContainer';
import { CompletionMessage } from './components/CompletionMessage';

export type ConeState = 'none' | 'picked' | 'filled' | 'chocolate' | 'topped' | 'complete';
export type ToppingType = 'sprinkles' | 'nuts';

function App() {
  const [coneState, setConeState] = useState<ConeState>('none');
  const [toppings, setToppings] = useState<ToppingType[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);

  const handlePickCone = () => {
    if (coneState === 'none') {
      setConeState('picked');
    }
  };

  const handleFillIceCream = () => {
    if (coneState === 'picked') {
      setConeState('filled');
    }
  };

  const handleDipChocolate = () => {
    if (coneState === 'filled') {
      setConeState('chocolate');
    }
  };

  const handleAddTopping = (topping: ToppingType) => {
    if (coneState === 'chocolate' && !toppings.includes(topping)) {
      const newToppings = [...toppings, topping];
      setToppings(newToppings);
      
      // After adding first topping, move to topped state
      if (newToppings.length === 1) {
        setConeState('topped');
      }
      
      // Complete after both toppings or after a short delay
      setTimeout(() => {
        setConeState('complete');
        setShowCompletion(true);
      }, 800);
    } else if (coneState === 'topped' && !toppings.includes(topping)) {
      const newToppings = [...toppings, topping];
      setToppings(newToppings);
      
      setTimeout(() => {
        setConeState('complete');
        setShowCompletion(true);
      }, 800);
    }
  };

  const handleReset = () => {
    setConeState('none');
    setToppings([]);
    setShowCompletion(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
      {/* Header */}
      <div className="text-center pt-8 pb-4">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
          Ice Cream Dream Shop
        </h1>
        <p className="text-lg text-gray-600 mt-2">Make your perfect chocolate dipped cone!</p>
      </div>

      {/* Main Scene */}
      <div className="relative w-full h-[600px] max-w-6xl mx-auto px-8">
        {/* Counter Background */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-200/80 to-pink-100/60 rounded-t-3xl shadow-2xl border-t-4 border-pink-300">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300"></div>
        </div>

        {/* Cone Tray (Left) */}
        <div className="absolute left-8 bottom-32 z-10">
          <ConeTray onPickCone={handlePickCone} isDisabled={coneState !== 'none'} />
        </div>

        {/* Soft Serve Machine (Center) */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-32 z-10">
          <SoftServeMachine isActive={coneState === 'picked'} />
        </div>

        {/* Chocolate Bowl (Center Right) */}
        <div className="absolute right-64 bottom-32 z-10">
          <ChocolateBowl isActive={coneState === 'filled'} />
        </div>

        {/* Topping Containers (Right) */}
        <div className="absolute right-8 bottom-32 z-10 flex gap-4">
          <ToppingContainer
            type="sprinkles"
            onAddTopping={handleAddTopping}
            isDisabled={coneState !== 'chocolate' && coneState !== 'topped'}
            hasTopping={toppings.includes('sprinkles')}
          />
          <ToppingContainer
            type="nuts"
            onAddTopping={handleAddTopping}
            isDisabled={coneState !== 'chocolate' && coneState !== 'topped'}
            hasTopping={toppings.includes('nuts')}
          />
        </div>

        {/* Draggable Cone */}
        {coneState !== 'none' && (
          <DraggableCone
            state={coneState}
            toppings={toppings}
            onFillIceCream={handleFillIceCream}
            onDipChocolate={handleDipChocolate}
          />
        )}
      </div>

      {/* Completion Message */}
      {showCompletion && <CompletionMessage onReset={handleReset} />}

      {/* Instructions */}
      {coneState === 'none' && (
        <div className="text-center mt-8 animate-bounce">
          <p className="text-xl text-purple-600 font-semibold">👇 Click a cone to start!</p>
        </div>
      )}
      {coneState === 'picked' && (
        <div className="text-center mt-8">
          <p className="text-xl text-purple-600 font-semibold">🍦 Drag the cone to the ice cream machine!</p>
        </div>
      )}
      {coneState === 'filled' && (
        <div className="text-center mt-8">
          <p className="text-xl text-purple-600 font-semibold">🍫 Now dip it in chocolate!</p>
        </div>
      )}
      {(coneState === 'chocolate' || coneState === 'topped') && !showCompletion && (
        <div className="text-center mt-8">
          <p className="text-xl text-purple-600 font-semibold">✨ Add some toppings!</p>
        </div>
      )}
    </div>
  );
}

export default App;
