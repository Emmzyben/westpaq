import { useRef, useState, useEffect } from 'react';
import { C } from '../theme/tokens';
import { Btn } from './Btn';

export function SignaturePad({ onSign, label = "Signature" }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = C.ink;
    }
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = (e) => {
    e.preventDefault();
    if (isDrawing) {
      setIsDrawing(false);
      onSign(canvasRef.current.toDataURL());
    }
  };

  const clearCanvas = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    onSign("");
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1.5">
        <label className="text-xs font-bold uppercase tracking-wide" style={{ color: C.ink2 }}>{label}</label>
        {hasSignature && (
          <button type="button" onClick={clearCanvas} className="text-xs text-red-500 font-semibold hover:underline">
            Clear
          </button>
        )}
      </div>
      <div 
        className="w-full rounded-lg bg-gray-50 overflow-hidden touch-none"
        style={{ border: `1px solid ${C.border}` }}
      >
        <canvas
          ref={canvasRef}
          width={400}
          height={150}
          className="w-full h-[150px] cursor-crosshair block bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      {!hasSignature && <div className="text-xs mt-1" style={{ color: C.ink3 }}>Please sign inside the box above.</div>}
    </div>
  );
}
