try:
        from view import View
        from simple_structure import Neki
        from transrot import mover_and_rotator
except ModuleNotFoundError:
        from PreizkusMDGrafike.view import View
        from PreizkusMDGrafike.simple_structure import Neki
        from PreizkusMDGrafike.transrot import mover_and_rotator

try:
        import pygame
except ModuleNotFoundError:
        print("Naložiti je potrebno pygame. \n(python3 -m pip install pygame)\n(py -m pip installl pygame) - Windows")
        raise ModuleNotFoundError("Manjka pygame modul.")
color = pygame.color.THECOLORS

from random import randint

def Text(text, pos, screen):
        """
        text se izpiše na zaslonu na mestu pos.
        Pisava je 'Comic Sans MS', velikost pisave 30, barva bela.
        """
        myfont = pygame.font.SysFont('Comic Sans MS', 30)
        color = (255, 255, 255)
        x, y = pos
        for line in text.split('\n'):
                textsurface = myfont.render(line, False, color)
                screen.blit(textsurface, (x, y))
                line_lenght, line_height = textsurface.get_size()
                y += line_height

def main():
        dimensions = int(input("Enter number of dimensions: "))
        view = View(dimensions)
        shape = Neki(dimensions)

        pygame.init()
        clock = pygame.time.Clock()
        DisplayInfo = pygame.display.Info()
        pygame.font.init()

        size = (DisplayInfo.current_w - 20, DisplayInfo.current_h - 80)
        screen = pygame.display.set_mode(size, pygame.RESIZABLE)
        size = screen_width, screen_height = pygame.display.get_surface().get_size()

        rot = [randint(-20, 20)/10 for i in range(dimensions - 1)]
        holding = dict()
        while True:
                for event in pygame.event.get():
                        if event.type == pygame.QUIT:
                                holding['Quit'] = True

                        elif event.type == pygame.KEYDOWN:
                                holding[pygame.key.name(event.key)] = True
                        elif event.type == pygame.KEYUP:
                                holding[pygame.key.name(event.key)] = False

                holding['ctrl'] = (holding.get('left ctrl', 0) or holding.get('right ctrl', 0))
                # ctrl + W zapre program
                if holding['ctrl'] and (holding.get('w', False) or holding.get('c', False)):
                        holding['Quit'] = True
                if holding.get('Quit', False):
                        return 0

                # Izračuanaj vse
                view.rotate(rot)
                to_draw = []
                trans, rotmat = mover_and_rotator(view)
                for triangle in shape.triangles:
                        dist, points = triangle.projection(trans, rotmat)
                        if dist > 0:
                                points = tuple((p[0] + screen_width/2, p[1] + screen_height/2) for p in points)
                                to_draw.append((dist, points))
                        #print(points, dist)

                to_draw.sort()

                screen.fill(color['black'])
                pygame.draw.circle(screen, color["blue"], (screen_width/2, screen_height/2), 1)

                # Nariši vse
                for d, triangle in to_draw:
                        pygame.draw.polygon(screen, color["white"], triangle, width=1)
                        for p in triangle:
                                pygame.draw.circle(screen, color["red"], p, 2, width=0)
                        # print(f'Drawing {triangle}')

                # Napiši čez, če kej hočeš
                data = str(view) + '\n' + f'fps: {int(clock.get_fps())}'
                Text(data, (10, 10), screen)


                pygame.display.update()
                clock.tick(30)

if __name__ == '__main__':
        main()
