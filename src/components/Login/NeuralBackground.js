import React, { useRef, useEffect } from "react";

export default function NeuralBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        /* ---------- 1. CONFIG GERAL ATUALIZADA ---------- */
        const NODES = 90; // Quantidade de nós aumentada
        const MAX_DIST = 180; // Distância máxima para traçar linha aumentada
        const SPEED = 0.3; // Velocidade de cada nó levemente reduzida
        const NODE_RADIUS = 3.5; // Raio do nó (px)
        const NODE_COLOR = "#7AC0FF"; // Cor principal dos nós e linhas (azul brilhante)
        const LINE_COLOR_RGB = "122, 192, 255"; // Componentes RGB da NODE_COLOR para usar em rgba
        const SHADOW_BLUR = 25; // Intensidade do brilho ao redor dos nós
        // const BOKEH_QTY = 50; // Removido - Quantidade de círculos desfocados ao fundo
        // const BOKEH_BASE_COLOR_RGB = "122, 192, 255"; // Removido - Cor base para o bokeh

        /* ---------- 2. GERAÇÃO DE PONTOS ---------- */
        const nodes = Array.from({ length: NODES }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * SPEED,
            vy: (Math.random() - 0.5) * SPEED,
        }));

        /* ---------- 3. BOKEH CIRCLES (background blur) - REMOVIDO ---------- */
        // const bokeh = Array.from({ length: BOKEH_QTY }, () => ({
        //     x: Math.random() * width,
        //     y: Math.random() * height,
        //     r: 10 + Math.random() * 30,
        //     a: 0.03 + Math.random() * 0.08,
        // }));

        /* ---------- 4. LOOP DE DESENHO ---------- */
        let animationFrameId;
        function draw() {
            if (!ctx) return;
            /* (4.1) fundo radial azul-profundo (mantido, bom contraste) */
            const g = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, Math.max(width, height) / 1.2
            );
            g.addColorStop(0, "#0d3c72"); // Centro levemente mais claro
            g.addColorStop(1, "#001830"); // Bordas mais escuras
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);

            /* (4.2) bokeh – círculos difusos flutuando - REMOVIDO */
            // bokeh.forEach(c => {
            //     ctx.beginPath();
            //     ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            //     ctx.fillStyle = `rgba(${BOKEH_BASE_COLOR_RGB}, ${c.a})`;
            //     ctx.fill();
            // });

            /* (4.3) linhas entre nós */
            for (let i = 0; i < NODES; i++) {
                for (let j = i + 1; j < NODES; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < MAX_DIST) {
                        ctx.strokeStyle = `rgba(${LINE_COLOR_RGB}, ${1 - dist / MAX_DIST})`;
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            /* (4.4) nós principais */
            nodes.forEach(p => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, NODE_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = NODE_COLOR;
                ctx.shadowColor = NODE_COLOR;
                ctx.shadowBlur = SHADOW_BLUR;
                ctx.fill();
                ctx.restore();

                p.x += p.vx;
                p.y += p.vy;
                if (p.x - NODE_RADIUS < 0 || p.x + NODE_RADIUS > width) p.vx *= -1;
                if (p.y - NODE_RADIUS < 0 || p.y + NODE_RADIUS > height) p.vy *= -1;
            });

            animationFrameId = requestAnimationFrame(draw);
        }
        draw();

        /* ---------- 5. RESPONSIVO ---------- */
        const resize = () => {
            if (!canvas) return;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                display: "block",
            }}
        />
    );
}
