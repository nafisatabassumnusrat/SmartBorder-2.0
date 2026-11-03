export interface DroneTelemetryHUD {
  altitudeMeters: number;
  speedKph: number;
  headingDeg: number;
  pitchDeg: number;
  rollDeg: number;
  batteryPct: number;
  lat: number;
  lng: number;
  opticalZoom: number;
  thermalPalette: 'WHITE_HOT' | 'BLACK_HOT' | 'IRONBOW';
  targetTrackLocked: boolean;
}

export class MediaService {
  /**
   * Generates or draws synthetic high-tech UAV surveillance HUD on HTML5 Canvas
   */
  public drawDroneHUD(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    telemetry: DroneTelemetryHUD,
    timeMs: number,
    boxes: { x: number; y: number; w: number; h: number; label: string; conf: number }[] = []
  ): void {
    // Clear background
    ctx.clearRect(0, 0, width, height);

    // Synthetic terrain background gradient simulating aerial desert / border topography
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    if (telemetry.thermalPalette === 'IRONBOW') {
      grad.addColorStop(0, '#100b2b');
      grad.addColorStop(0.5, '#3b1259');
      grad.addColorStop(1, '#662244');
    } else if (telemetry.thermalPalette === 'WHITE_HOT') {
      grad.addColorStop(0, '#1a1f2c');
      grad.addColorStop(0.5, '#2b3345');
      grad.addColorStop(1, '#3b4354');
    } else {
      // Standard Electro-Optical Tactical Dark
      grad.addColorStop(0, '#0c1524');
      grad.addColorStop(0.5, '#162238');
      grad.addColorStop(1, '#1f2e4d');
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw synthetic terrain elevation contours / grid lines
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
    ctx.lineWidth = 1;
    const offset = (timeMs / 40) % 40;
    for (let y = offset; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    for (let x = offset; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    ctx.restore();

    // Prominent DEMO / SIMULATED WATERMARK
    ctx.save();
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.fillText('● SIMULATED FEED — SYNTHETIC DEMONSTRATION RANGE ONLY', 24, 32);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillText(`SENSOR: EO-4K / LWIR RADIOMETRIC | AI ENGINE: YOLOv8x-Border-v2.4`, 24, 50);
    ctx.restore();

    // Top Center Compass Rose
    ctx.save();
    ctx.fillStyle = 'rgba(16, 185, 129, 0.9)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.8)';
    ctx.lineWidth = 1.5;
    const compassWidth = 240;
    const compassX = width / 2 - compassWidth / 2;
    const compassY = 25;
    ctx.strokeRect(compassX, compassY, compassWidth, 24);

    const heading = Math.round(telemetry.headingDeg) % 360;
    ctx.font = 'bold 12px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`HDG: ${heading}° [${this.getCompassCardinal(heading)}]`, width / 2, compassY + 16);
    ctx.restore();

    // Center Crosshair and Pitch Ladder
    ctx.save();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.7)';
    ctx.lineWidth = 1.5;
    const cx = width / 2;
    const cy = height / 2;

    // Center reticle
    ctx.beginPath();
    ctx.arc(cx, cy, 30, 0, Math.PI * 2);
    ctx.moveTo(cx - 50, cy);
    ctx.lineTo(cx - 35, cy);
    ctx.moveTo(cx + 35, cy);
    ctx.lineTo(cx + 50, cy);
    ctx.moveTo(cx, cy - 50);
    ctx.lineTo(cx, cy - 35);
    ctx.moveTo(cx, cy + 35);
    ctx.lineTo(cx, cy + 50);
    ctx.stroke();

    // Pitch ladder bars
    const pitchOffset = telemetry.pitchDeg * 2;
    ctx.beginPath();
    ctx.moveTo(cx - 80, cy - 60 + pitchOffset);
    ctx.lineTo(cx - 50, cy - 60 + pitchOffset);
    ctx.moveTo(cx + 50, cy - 60 + pitchOffset);
    ctx.lineTo(cx + 80, cy - 60 + pitchOffset);
    ctx.moveTo(cx - 60, cy + 60 + pitchOffset);
    ctx.lineTo(cx - 40, cy + 60 + pitchOffset);
    ctx.moveTo(cx + 40, cy + 60 + pitchOffset);
    ctx.lineTo(cx + 60, cy + 60 + pitchOffset);
    ctx.stroke();
    ctx.restore();

    // Left Telemetry: Airspeed & Altitude
    ctx.save();
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = '#10B981';
    ctx.textAlign = 'left';
    ctx.fillText(`SPD: ${telemetry.speedKph.toFixed(1)} KM/H`, 24, cy - 40);
    ctx.fillText(`ALT: ${telemetry.altitudeMeters.toFixed(0)} M AGL`, 24, cy - 20);
    ctx.fillText(`BAT: ${telemetry.batteryPct}%`, 24, cy);
    ctx.fillText(`LAT: ${telemetry.lat.toFixed(5)}° N`, 24, cy + 20);
    ctx.fillText(`LNG: ${Math.abs(telemetry.lng).toFixed(5)}° W`, 24, cy + 40);
    ctx.restore();

    // Right Telemetry: Gimbal & Camera
    ctx.save();
    ctx.font = '11px ui-monospace, monospace';
    ctx.fillStyle = '#10B981';
    ctx.textAlign = 'right';
    ctx.fillText(`ZOOM: ${telemetry.opticalZoom.toFixed(1)}x`, width - 24, cy - 40);
    ctx.fillText(`PALETTE: ${telemetry.thermalPalette}`, width - 24, cy - 20);
    ctx.fillText(`PITCH: ${telemetry.pitchDeg.toFixed(1)}°`, width - 24, cy);
    ctx.fillText(`ROLL: ${telemetry.rollDeg.toFixed(1)}°`, width - 24, cy + 20);
    ctx.fillText(`LINK: 99.8% (AES-256)`, width - 24, cy + 40);
    ctx.restore();

    // Draw Bounding Boxes with tactical brackets
    boxes.forEach((box) => {
      const bx = (box.x / 100) * width;
      const by = (box.y / 100) * height;
      const bw = (box.w / 100) * width;
      const bh = (box.h / 100) * height;

      ctx.save();
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;

      // Draw corner brackets
      const cornerLen = 14;
      ctx.beginPath();
      // Top-left
      ctx.moveTo(bx, by + cornerLen);
      ctx.lineTo(bx, by);
      ctx.lineTo(bx + cornerLen, by);
      // Top-right
      ctx.moveTo(bx + bw - cornerLen, by);
      ctx.lineTo(bx + bw, by);
      ctx.lineTo(bx + bw, by + cornerLen);
      // Bottom-left
      ctx.moveTo(bx, by + bh - cornerLen);
      ctx.lineTo(bx, by + bh);
      ctx.lineTo(bx + cornerLen, by + bh);
      // Bottom-right
      ctx.moveTo(bx + bw - cornerLen, by + bh);
      ctx.lineTo(bx + bw, by + bh);
      ctx.lineTo(bx + bw, by + bh - cornerLen);
      ctx.stroke();

      // Label background & text
      ctx.fillStyle = 'rgba(13, 21, 38, 0.85)';
      ctx.fillRect(bx, by - 22, 160, 20);
      ctx.strokeStyle = '#10B981';
      ctx.strokeRect(bx, by - 22, 160, 20);

      ctx.fillStyle = '#F8FAFC';
      ctx.font = 'bold 10px ui-monospace, monospace';
      ctx.fillText(`${box.label} (${(box.conf * 100).toFixed(1)}%)`, bx + 6, by - 8);

      // Trajectory / tracking line
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.beginPath();
      ctx.moveTo(bx + bw / 2, by + bh);
      ctx.lineTo(bx + bw / 2, by + bh + 30);
      ctx.stroke();
      ctx.restore();
    });

    // Bottom Timecode & Frame Counter
    ctx.save();
    ctx.font = '12px ui-monospace, monospace';
    ctx.fillStyle = '#94A3B8';
    ctx.textAlign = 'center';
    const seconds = Math.floor(timeMs / 1000);
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    const ms = String(Math.floor((timeMs % 1000) / 10)).padStart(2, '0');
    ctx.fillText(`UTC TIME: 2026-11-03 ${mm}:${ss}:${ms} | FRAME: ${Math.floor(timeMs / 33.3)} | BUFFER: 100%`, width / 2, height - 20);
    ctx.restore();
  }

  private getCompassCardinal(deg: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  }
}

export const mediaService = new MediaService();
