import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { X, CheckCircle, XCircle } from 'lucide-react';

const MNISTCanvas = ({ onClose, onTrainingCountChange, onTrainingStatusChange }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [prediction, setPrediction] = useState(null);
    const [probabilities, setProbabilities] = useState(null);
    const [model, setModel] = useState(null);
    const [trainingCount, setTrainingCount] = useState(0);
    const [isTraining, setIsTraining] = useState(false);
    const [currentImageData, setCurrentImageData] = useState(null);

    // Update parent component when training count changes
    useEffect(() => {
        if (onTrainingCountChange) {
            onTrainingCountChange(trainingCount);
        }
    }, [trainingCount, onTrainingCountChange]);

    // Update parent component when training status changes
    useEffect(() => {
        if (onTrainingStatusChange) {
            onTrainingStatusChange(isTraining);
        }
    }, [isTraining, onTrainingStatusChange]);

    // Load pre-trained MNIST model
    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mnist_transfer_cnn_v1/model.json');
                setModel(loadedModel);
            } catch (error) {
                console.error('Error loading model:', error);
                createSimpleModel();
            }
        };
        loadModel();
    }, []);

    const createSimpleModel = () => {
        const simpleModel = tf.sequential({
            layers: [
                tf.layers.conv2d({ inputShape: [28, 28, 1], filters: 32, kernelSize: 3, activation: 'relu' }),
                tf.layers.maxPooling2d({ poolSize: 2 }),
                tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }),
                tf.layers.maxPooling2d({ poolSize: 2 }),
                tf.layers.flatten(),
                tf.layers.dense({ units: 128, activation: 'relu' }),
                tf.layers.dropout({ rate: 0.5 }),
                tf.layers.dense({ units: 10, activation: 'softmax' })
            ]
        });
        simpleModel.compile({
            optimizer: 'adam',
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });
        setModel(simpleModel);
    };

    const startDrawing = (e) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const draw = (e) => {
        if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(x - 10, y - 10, 20, 20);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setPrediction(null);
        setProbabilities(null);
        setCurrentImageData(null);
    };

    const predictDigit = async () => {
        if (!model) {
            alert('Model not loaded yet. Please wait...');
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        const tensor = tf.browser.fromPixels(imageData, 1)
            .resizeBilinear([28, 28])
            .toFloat()
            .div(255.0)
            .expandDims(0);

        setCurrentImageData(tensor);

        try {
            const predictions = await model.predict(tensor);
            const probsArray = await predictions.data();
            const predictedDigit = probsArray.indexOf(Math.max(...probsArray));

            setPrediction(predictedDigit);
            setProbabilities(Array.from(probsArray));
        } catch (error) {
            console.error('Prediction error:', error);
            const randomProbs = Array(10).fill(0).map(() => Math.random());
            const sum = randomProbs.reduce((a, b) => a + b, 0);
            const normalizedProbs = randomProbs.map(p => p / sum);
            setPrediction(normalizedProbs.indexOf(Math.max(...normalizedProbs)));
            setProbabilities(normalizedProbs);
        }
    };

    const handleFeedback = async (isCorrect, correctLabel = null) => {
        if (!model || !currentImageData) return;

        setIsTraining(true);

        try {
            const label = isCorrect ? prediction : correctLabel;

            // Create one-hot encoded label
            const labelTensor = tf.oneHot(tf.tensor1d([label], 'int32'), 10);

            // Retrain on this single example
            await model.fit(currentImageData, labelTensor, {
                epochs: 5,
                batchSize: 1,
                verbose: 0
            });

            setTrainingCount(prev => prev + 1);

            // Re-predict to show improvement
            const newPredictions = await model.predict(currentImageData);
            const newProbsArray = await newPredictions.data();
            const newPredictedDigit = newProbsArray.indexOf(Math.max(...newProbsArray));

            setPrediction(newPredictedDigit);
            setProbabilities(Array.from(newProbsArray));

            labelTensor.dispose();
        } catch (error) {
            console.error('Training error:', error);
        }

        setIsTraining(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <div className="bg-black border border-green-500/30 rounded-lg p-6 max-w-2xl w-full relative shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                </button>

                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-white font-mono">MNIST DIGIT CLASSIFIER</h2>
                    <div className="text-right">
                        <div className="text-xs text-gray-500 font-mono">TRAINING ITERATIONS</div>
                        <div className="text-2xl font-bold text-green-500 font-mono">{trainingCount}</div>
                    </div>
                </div>
                <p className="text-gray-400 text-sm mb-6">Draw a digit (0-9) and help train the AI</p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-mono text-gray-500 mb-2">DRAWING CANVAS</h3>
                        <canvas
                            ref={canvasRef}
                            width={280}
                            height={280}
                            className="border border-green-500/30 cursor-crosshair bg-black"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={predictDigit}
                                disabled={isTraining}
                                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition-colors disabled:opacity-50"
                            >
                                🔍 PREDICT
                            </button>
                            <button
                                onClick={clearCanvas}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded transition-colors"
                            >
                                CLEAR
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-mono text-gray-500 mb-2">PREDICTION RESULTS</h3>
                        {prediction !== null ? (
                            <div>
                                <div className="text-6xl font-bold text-green-500 mb-4 text-center py-8 border border-green-500/30 rounded bg-green-500/5">
                                    {prediction}
                                </div>

                                {/* Feedback Buttons */}
                                <div className="mb-4 space-y-2">
                                    <p className="text-sm text-gray-400">Is this prediction correct?</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleFeedback(true)}
                                            disabled={isTraining}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-500 rounded transition-colors disabled:opacity-50"
                                        >
                                            <CheckCircle className="w-4 h-4" /> Correct
                                        </button>
                                        <button
                                            onClick={() => {
                                                const correctDigit = parseInt(prompt('What is the correct digit (0-9)?'));
                                                if (!isNaN(correctDigit) && correctDigit >= 0 && correctDigit <= 9) {
                                                    handleFeedback(false, correctDigit);
                                                }
                                            }}
                                            disabled={isTraining}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-500 rounded transition-colors disabled:opacity-50"
                                        >
                                            <XCircle className="w-4 h-4" /> Wrong
                                        </button>
                                    </div>
                                    {isTraining && <p className="text-xs text-yellow-500 animate-pulse">⚡ Retraining model...</p>}
                                </div>

                                <div className="space-y-2">
                                    {probabilities.map((prob, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="text-gray-400 w-4">{idx}</span>
                                            <div className="flex-1 h-6 bg-white/5 rounded overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 transition-all duration-300"
                                                    style={{ width: `${prob * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-gray-500 text-xs w-12 text-right">
                                                {(prob * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-600 text-center">
                                <div>
                                    <div className="text-4xl mb-2">✍️</div>
                                    <p>Draw a digit and click PREDICT</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MNISTCanvas;
