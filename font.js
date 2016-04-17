'use strict';

const PIXEL_SIZE = 10;

const letterY = [{
    x: 0,
    y: 0
}, {
    x: 1,
    y: 1
}, {
    x: 2,
    y: 2
}, {
    x: 3,
    y: 1
}, {
    x: 4,
    y: 0
}, {
    x: 2,
    y: 3
}, {
    x: 2,
    y: 4
}];

const letterO = [{
    x: 0,
    y: 0
}, {
    x: 0,
    y: 1
}, {
    x: 0,
    y: 2
}, {
    x: 0,
    y: 3
}, {
    x: 0,
    y: 4
}, {
    x: 1,
    y: 0
}, {
    x: 2,
    y: 0
}, {
    x: 1,
    y: 4
}, {
    x: 2,
    y: 4
}, {
    x: 3,
    y: 0
}, {
    x: 3,
    y: 1
}, {
    x: 3,
    y: 2
}, {
    x: 3,
    y: 3
}, {
    x: 3,
    y: 4
}];

const letterU = [{
    x: 0,
    y: 0
}, {
    x: 0,
    y: 1
}, {
    x: 0,
    y: 2
}, {
    x: 0,
    y: 3
}, {
    x: 0,
    y: 4
}, {
    x: 1,
    y: 4
}, {
    x: 2,
    y: 4
}, {
    x: 3,
    y: 0
}, {
    x: 3,
    y: 1
}, {
    x: 3,
    y: 2
}, {
    x: 3,
    y: 3
}, {
    x: 3,
    y: 4
}];

const letterL = [{
    x: 0,
    y: 0
}, {
    x: 0,
    y: 1
}, {
    x: 0,
    y: 2
}, {
    x: 0,
    y: 3
}, {
    x: 0,
    y: 4
}, {
    x: 1,
    y: 4
}, {
    x: 2,
    y: 4
}, {
    x: 3,
    y: 4
}];

const letterS = [{
    x: 0,
    y: 0
}, {
    x: 0,
    y: 1
}, {
    x: 0,
    y: 2
}, {
    x: 0,
    y: 4
}, {
    x: 1,
    y: 0
}, {
    x: 1,
    y: 2
}, {
    x: 1,
    y: 4
}, {
    x: 2,
    y: 0
}, {
    x: 2,
    y: 2
}, {
    x: 2,
    y: 4
}, {
    x: 3,
    y: 0
}, {
    x: 3,
    y: 2
}, {
    x: 3,
    y: 3
}, {
    x: 3,
    y: 4
}];

const letterE = [{
    x: 0,
    y: 0
}, {
    x: 0,
    y: 1
}, {
    x: 0,
    y: 2
}, {
    x: 0,
    y: 4
}, {
    x: 1,
    y: 0
}, {
    x: 1,
    y: 2
}, {
    x: 1,
    y: 4
}, {
    x: 2,
    y: 0
}, {
    x: 2,
    y: 2
}, {
    x: 2,
    y: 4
}, {
    x: 3,
    y: 0
}, {
    x: 3,
    y: 2
}, {
    x: 0,
    y: 3
}, {
    x: 3,
    y: 4
}];

const letterI = [{
    x: 0,
    y: 0
}, {
    x: 1,
    y: 0
}, {
    x: 2,
    y: 0
}, {
    x: 0,
    y: 4
}, {
    x: 1,
    y: 4
}, {
    x: 2,
    y: 4
}, {
    x: 1,
    y: 1
}, {
    x: 1,
    y: 2
}, {
    x: 1,
    y: 3
}];

const letterW = [{
    x: 0,
    y: 0
}, {
    x: 0,
    y: 1
}, {
    x: 0,
    y: 2
}, {
    x: 0,
    y: 3
}, {
    x: 1,
    y: 4
}, {
    x: 2,
    y: 2
}, {
    x: 2,
    y: 3
}, {
    x: 3,
    y: 4
}, {
    x: 4,
    y: 0
}, {
    x: 4,
    y: 1
}, {
    x: 4,
    y: 2
}, {
    x: 4,
    y: 3
}];

const letterN = [
    {
        x: 0,
        y: 0
}, {
        x: 0,
        y: 1
}, {
        x: 0,
        y: 2
}, {
        x: 0,
        y: 3
}, {
        x: 0,
        y: 4
}, {
        x: 1,
        y: 1
}, {
        x: 2,
        y: 2
}, {
        x: 3,
        y: 3
}, {
        x: 4,
        y: 0
}, {
        x: 4,
        y: 1
}, {
        x: 4,
        y: 2
}, {
        x: 4,
        y: 3
}, {
        x: 4,
        y: 4
}];

const letterC = [
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: 2
    },
    {
        x: 0,
        y: 3
    },
    {
        x: 0,
        y: 4
    },
    {
        x: 1,
        y: 0
    },
    {
        x: 2,
        y: 0
    },
    {
        x: 3,
        y: 0
    },
    {
        x: 1,
        y: 4
    },
    {
        x: 2,
        y: 4
    },
    {
        x: 3,
        y: 4
    }
];

const letterK = [
    {
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 1
    },
    {
        x: 0,
        y: 2
    },
    {
        x: 0,
        y: 3
    },
    {
        x: 0,
        y: 4
    },
    {
        x: 1,
        y: 2
    },
    {
        x: 2,
        y: 1
    },
    {
        x: 3,
        y: 0
    },
    {
        x: 2,
        y: 3
    },
    {
        x: 3,
        y: 4
    }
];

const letterMappings = {
    'Y': letterY,
    'O': letterO,
    'U': letterU,
    'L': letterL,
    'S': letterS,
    'E': letterE,
    'W': letterW,
    'I': letterI,
    'N': letterN,
    'C': letterC,
    'K': letterK
};

function drawLetter(ctx, letter, xPosition, yPosition, color = 'white') {
    letterMappings[letter]
        .forEach((pixel) => {
            drawPixel(ctx, color, pixel.x, pixel.y, xPosition, yPosition);
        });
}

function drawPixel(ctx, color, x, y, xOffset = 0, yOffset = 0) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(
        (x + xOffset) * PIXEL_SIZE,
        (y + yOffset) * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE);
    ctx.restore();
}
