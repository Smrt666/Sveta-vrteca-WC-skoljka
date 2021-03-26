import numpy as np

class Point:
        def __init__(self, coordinates):
                self.array = np.array([[c] for c in coordinates])
        
        def move_and_rotate(self, move: np.array, rotmat: np.array):
                return rotmat @ (self.array - move)
        
        def __str__(self):
                return str(self.array)
