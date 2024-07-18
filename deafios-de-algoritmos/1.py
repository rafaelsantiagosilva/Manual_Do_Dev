def fatorial(n):
     if n == 1:
          return n
     else:
          return n * fatorial(n-1)
     
n = int(input("Digite um número para calcular seu fatorial: "))
print(fatorial(n))