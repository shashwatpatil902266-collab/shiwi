document.addEventListener('DOMContentLoaded', () => {

    // RADAR CANVAS ANIMATION
    const canvas = document.getElementById('radar-screen');
    const ctx = canvas.getContext('2d');

    let width, height;

    let angle = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    // Radar 'Blips' (Targets)
    const blips = [];
    for (let i = 0; i < 5; i++) {
        blips.push({
            x: Math.random() * width,
            y: Math.random() * height,
            life: Math.random()
        });
    }

    function drawRadar() {
        // Fade effect for trails
        ctx.fillStyle = 'rgba(15, 18, 15, 0.1)';
        ctx.fillRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.max(width, height) / 1.5;

        // Draw Sweep Line
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);

        const gradient = ctx.createLinearGradient(0, 0, radius, 0);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, 0, 0.2); // Small slice
        ctx.fill();
        ctx.restore();

        angle += 0.02;

        // Draw Blips (Random dots appearing)
        blips.forEach(blip => {
            if (Math.random() > 0.95) {
                ctx.fillStyle = `rgba(0, 255, 0, ${Math.random()})`;
                ctx.beginPath();
                ctx.arc(blip.x, blip.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        // Grid Rings
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 250, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 400, 0, Math.PI * 2);
        ctx.stroke();

        requestAnimationFrame(drawRadar);
    }

    drawRadar();

    // TYPEWRITER EFFECT
    const text = "INITIALIZING BIRTHDAY SEQUENCE... \nACCESSING FILE: BROTHER... \nLOADING TRIBUTE...";
    const typeContainer = document.getElementById('typewriter');
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < text.length) {
            typeContainer.innerHTML += text.charAt(typeIndex) === '\n' ? '<br>' : text.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    // Start typing after delay
    setTimeout(typeWriter, 1000);


    // SCROLL REVEAL (Folders)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.file-folder, .final-mission').forEach(el => observer.observe(el));

    // COMMANDO INTERACTIONS
    const dropBtn = document.getElementById('call-drop-btn');
    const parachute = document.getElementById('parachute');
    const crate = document.querySelector('.crate');
    const modal = document.getElementById('promotion-modal');
    const dismissBtn = document.getElementById('dismiss-btn');
    const rankDisplay = document.getElementById('rank-display');

    if (dropBtn) {
        dropBtn.addEventListener('click', () => {
            // Disable button
            dropBtn.disabled = true;
            dropBtn.innerText = "INBOUND...";

            // Show Parachute
            parachute.classList.remove('hidden');

            // Animate Drop (Small delay to allow CSS transition to catch the 'top' change)
            setTimeout(() => {
                parachute.classList.add('dropping');
            }, 100);
        });
    }

    if (crate) {
        crate.addEventListener('click', () => {
            // "Breach" the crate -> Show Promotion
            // Explosion sound effect could go here

            // Hide parachute
            parachute.classList.add('hidden');

            // Show Modal
            modal.classList.remove('hidden');
        });
    }

    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            // Update Rank on UI
            if (rankDisplay) {
                rankDisplay.innerText = "ELITE COMMANDO";
                rankDisplay.style.color = "#cca43b";
                rankDisplay.style.textShadow = "0 0 10px gold";
            }
            // Reset button text
            dropBtn.innerText = "DROP RECEIVED";
        });
    }
});
