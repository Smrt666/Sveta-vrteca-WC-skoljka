import numpy as np

zoom = 200

class Triangle:
        def __init__(self, points):
                self.points = points
                #print(*points, sep='\n', end='\n#####\n')
        
        def projection(self, move, rotmat):
                t = (point.move_and_rotate(move, rotmat) for point in self.points)
                ps = []
                distances = [] # za povprečje
                visible = True
                for point in t:
                        r = np.linalg.norm(point)
                        if r == 0:
                                ps.append((0, 0))
                        else:
                                ps.append((point[0][0] / r * zoom, point[1][0] / r * zoom))
                        visible *= all(point[i][0] >= 0 for i in range(2, len(point)))
                        distances.append(r)
                average_distance = sum(distances)/len(distances)
                if not visible:
                        pass
                        # average_distance *= -1
                return (average_distance, tuple(ps))

