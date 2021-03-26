try:
        from point import Point
        from triangle import Triangle
except ModuleNotFoundError:
        from PreizkusMDGrafike.point import Point
        from PreizkusMDGrafike.triangle import Triangle

class Neki:
        def __init__(self, dimesions):
                starting_pos = [0]*dimesions
                self.points = [Point(starting_pos)]
                for i in range(dimesions):
                        position = starting_pos.copy()
                        position[i] = 100
                        self.points.append(Point(position))
                #print(*self.points, sep='\n')
                
                self.triangles = []
                for i in range(1, len(self.points)-1):
                        # Prvega izpuščam ker je v vseh trikotnikih
                        # Zadnjega pa ker ne ostane nobena točka,
                        # s katero bi jo povezal
                        for j in range(i+1, len(self.points)):
                                tr = Triangle((self.points[0], self.points[i], self.points[j]))
                                self.triangles.append(tr)
        
